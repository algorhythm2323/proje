// Bu script dosyası Firebase Firestore veritabanınızı örnek verilerle doldurmak için kullanılır
// Firebase Console'da "Firestore Database" bölümünde "Rules" sekmesinde test modunda çalışın
// Firebase Console'da "Authentication" bölümünde "Sign-in method" sekmesinde "Anonymous" girişi etkinleştirin

// Bu dosyayı doğrudan çalıştırmayın, kod parçalarını Firebase konsolunda çalıştırın

// 1. Masaları oluşturun
for (let i = 1; i <= 10; i++) {
  db.collection('masalar').add({
    masaNumarasi: i,
    durum: 'bos'
  })
  .then((docRef) => {
    console.log(`Masa ${i} oluşturuldu, ID: ${docRef.id}`);
  })
  .catch((error) => {
    console.error(`Masa ${i} oluşturulurken hata:`, error);
  });
}

// 2. Menü öğelerini ekleyin
const menuItems = [
  { 
    ad: 'Izgara Köfte', 
    fiyat: 80, 
    kategori: 'yemekler', 
    aciklama: 'İki adet ızgara köfte, patates kızartması ve salata ile' 
  },
  { 
    ad: 'Tavuk Şiş', 
    fiyat: 70, 
    kategori: 'yemekler', 
    aciklama: 'Marine edilmiş tavuk şiş, pilav ve közlenmiş sebzeler ile' 
  },
  { 
    ad: 'Karışık Pizza', 
    fiyat: 90, 
    kategori: 'yemekler', 
    aciklama: 'Sucuk, mantar, zeytin, mısır ve kaşar peyniri ile' 
  },
  { 
    ad: 'Coca Cola', 
    fiyat: 15, 
    kategori: 'icecekler', 
    aciklama: '330ml kutu' 
  },
  { 
    ad: 'Ayran', 
    fiyat: 10, 
    kategori: 'icecekler', 
    aciklama: '300ml' 
  },
  { 
    ad: 'Çay', 
    fiyat: 5, 
    kategori: 'icecekler', 
    aciklama: 'Demlik çay' 
  },
  { 
    ad: 'Künefe', 
    fiyat: 45, 
    kategori: 'tatlilar', 
    aciklama: 'Fıstıklı künefe, dondurma ile servis edilir' 
  },
  { 
    ad: 'Baklava', 
    fiyat: 40, 
    kategori: 'tatlilar', 
    aciklama: 'Fıstıklı baklava, 2 dilim' 
  }
];

// Tüm menü öğelerini ekle
menuItems.forEach((item, index) => {
  db.collection('menu').add(item)
  .then((docRef) => {
    console.log(`${item.ad} menüye eklendi, ID: ${docRef.id}`);
  })
  .catch((error) => {
    console.error(`${item.ad} eklenirken hata:`, error);
  });
}); 