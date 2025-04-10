// Ortak fonksiyonlar
// Bildirim gösterme
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Oturum kontrolü
function checkAuth() {
  return new Promise((resolve, reject) => {
    // Eğer çevrimdışı servis varsa, doğrudan localStorage'dan kontrol et
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
      resolve(currentUser);
    } else {
      reject('Oturum açık değil');
      window.location.href = '../index.html';
    }
  });
}

// Para formatı
function formatPrice(price) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price);
}

// Tarih formatı
function formatDate(timestamp) {
  if (!timestamp) return ''; // timestamp null veya undefined ise boş string döndür
  
  const date = timestamp instanceof Date ? timestamp : 
    (timestamp.toDate ? timestamp.toDate() : new Date(timestamp));
  
  return new Intl.DateTimeFormat('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Menu işlemleri
async function getMenu() {
  try {
    const snapshot = await menuCollection.get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Menü alınamadı:', error);
    showNotification('Menü yüklenirken bir hata oluştu', 'error');
    return [];
  }
}

// Masa işlemleri
async function getMasalar() {
  try {
    const snapshot = await masalarCollection.get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Masalar alınamadı:', error);
    showNotification('Masalar yüklenirken bir hata oluştu', 'error');
    return [];
  }
}

async function getMasaById(masaId) {
  try {
    const doc = await masalarCollection.doc(masaId).get();
    if (doc.exists) {
      return {
        id: doc.id,
        ...doc.data()
      };
    } else {
      showNotification('Masa bulunamadı', 'error');
      return null;
    }
  } catch (error) {
    console.error('Masa alınamadı:', error);
    showNotification('Masa bilgileri yüklenirken bir hata oluştu', 'error');
    return null;
  }
}

// Sipariş işlemleri
async function getSiparisler(status = null) {
  try {
    let query = siparislerCollection;
    
    if (status) {
      query = query.where('durum', '==', status);
    }
    
    const snapshot = await query.orderBy('tarih', 'desc').get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Siparişler alınamadı:', error);
    showNotification('Siparişler yüklenirken bir hata oluştu', 'error');
    return [];
  }
}

async function getSiparisByMasaId(masaId) {
  try {
    const snapshot = await siparislerCollection
      .where('masaId', '==', masaId)
      .where('durum', 'in', ['beklemede', 'hazirlaniyor', 'hazir', 'teslim_edildi'])
      .get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Masa siparişleri alınamadı:', error);
    showNotification('Masa siparişleri yüklenirken bir hata oluştu', 'error');
    return [];
  }
}

async function createSiparis(siparisData) {
  try {
    const siparis = {
      ...siparisData,
      tarih: firebase.firestore.FieldValue.serverTimestamp(),
      durum: 'beklemede'
    };
    
    const docRef = await siparislerCollection.add(siparis);
    
    // Masa durumunu güncelle
    await masalarCollection.doc(siparisData.masaId).update({
      durum: 'dolu'
    });
    
    // Mutfağa gerçek zamanlı bildirim gönder
    realdb.ref('bildirimler/mutfak').push({
      mesaj: `Masa ${siparisData.masaNumarasi} için yeni sipariş`,
      tarih: firebase.database.ServerValue.TIMESTAMP
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Sipariş oluşturulamadı:', error);
    showNotification('Sipariş oluşturulurken bir hata oluştu', 'error');
    return null;
  }
}

async function updateSiparisDurum(siparisId, durum) {
  try {
    await siparislerCollection.doc(siparisId).update({
      durum: durum
    });
    
    // Garsona gerçek zamanlı bildirim gönder
    if (durum === 'hazir') {
      const siparisDoc = await siparislerCollection.doc(siparisId).get();
      const siparis = siparisDoc.data();
      
      realdb.ref('bildirimler/garson').push({
        mesaj: `Masa ${siparis.masaNumarasi} siparişi hazır`,
        masaId: siparis.masaId,
        tarih: firebase.database.ServerValue.TIMESTAMP
      });
    }
    
    return true;
  } catch (error) {
    console.error('Sipariş durumu güncellenemedi:', error);
    showNotification('Sipariş durumu güncellenirken bir hata oluştu', 'error');
    return false;
  }
}

// Adisyon işlemleri
async function getAdisyon(masaId) {
  try {
    const siparisler = await getSiparisByMasaId(masaId);
    
    if (siparisler.length === 0) {
      return null;
    }
    
    const urunler = [];
    let toplamTutar = 0;
    
    siparisler.forEach(siparis => {
      siparis.urunler.forEach(urun => {
        urunler.push(urun);
        toplamTutar += urun.fiyat * urun.adet;
      });
    });
    
    return {
      masaId,
      urunler,
      toplamTutar,
      siparisler
    };
  } catch (error) {
    console.error('Adisyon alınamadı:', error);
    showNotification('Adisyon yüklenirken bir hata oluştu', 'error');
    return null;
  }
}

async function kapatAdisyon(masaId) {
  try {
    const siparisler = await getSiparisByMasaId(masaId);
    
    // Tüm siparişleri 'tamamlandi' olarak işaretle
    const promises = siparisler.map(siparis => {
      return siparislerCollection.doc(siparis.id).update({
        durum: 'tamamlandi'
      });
    });
    
    await Promise.all(promises);
    
    // Masa durumunu 'bos' olarak güncelle
    await masalarCollection.doc(masaId).update({
      durum: 'bos'
    });
    
    return true;
  } catch (error) {
    console.error('Adisyon kapatılamadı:', error);
    showNotification('Adisyon kapatılırken bir hata oluştu', 'error');
    return false;
  }
}

// Gerçek zamanlı bildirim dinleyicileri
function listenForNotifications(role) {
  const ref = realdb.ref(`bildirimler/${role}`);
  
  ref.on('child_added', (snapshot) => {
    const bildirim = snapshot.val();
    showNotification(bildirim.mesaj);
    
    // Okundu olarak işaretle
    snapshot.ref.remove();
  });
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
  // Kullanıcı rolüne göre bildirim dinleyicisini başlat
  const role = document.body.dataset.role;
  if (role) {
    listenForNotifications(role);
  }
});

// Oturumu kapat ve anasayfaya yönlendir
function logout() {
  return new Promise((resolve) => {
    // LocalStorage'dan kullanıcı bilgisini temizle
    localStorage.removeItem('currentUser');
    
    // Eğer auth mevcutsa signOut'u çağır
    if (auth && typeof auth.signOut === 'function') {
      auth.signOut().then(() => {
        window.location.href = '../index.html';
        resolve();
      });
    } else {
      // Auth yoksa direkt yönlendir
      window.location.href = '../index.html';
      resolve();
    }
  });
} 