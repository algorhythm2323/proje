// Çevrimdışı mod servisi - Firebase yerine LocalStorage kullanarak çalışır
// Bu dosya firebase-config.js yerine kullanılabilir

// Veri servisi
class OfflineDataService {
  constructor() {
    this.initialize();
  }
  
  // Başlangıç verilerini kontrol et ve gerekirse oluştur
  initialize() {
    // Menü kontrolü
    if (!localStorage.getItem('offlineMenu')) {
      const defaultMenu = [
        { id: 'menu1', ad: 'Izgara Köfte', fiyat: 80, kategori: 'yemekler', aciklama: 'İki adet ızgara köfte, patates kızartması ve salata ile' },
        { id: 'menu2', ad: 'Tavuk Şiş', fiyat: 70, kategori: 'yemekler', aciklama: 'Marine edilmiş tavuk şiş, pilav ve közlenmiş sebzeler ile' },
        { id: 'menu3', ad: 'Karışık Pizza', fiyat: 90, kategori: 'yemekler', aciklama: 'Sucuk, mantar, zeytin, mısır ve kaşar peyniri ile' },
        { id: 'menu4', ad: 'Coca Cola', fiyat: 15, kategori: 'icecekler', aciklama: '330ml kutu' },
        { id: 'menu5', ad: 'Ayran', fiyat: 10, kategori: 'icecekler', aciklama: '300ml' },
        { id: 'menu6', ad: 'Çay', fiyat: 5, kategori: 'icecekler', aciklama: 'Demlik çay' },
        { id: 'menu7', ad: 'Künefe', fiyat: 45, kategori: 'tatlilar', aciklama: 'Fıstıklı künefe, dondurma ile servis edilir' },
        { id: 'menu8', ad: 'Baklava', fiyat: 40, kategori: 'tatlilar', aciklama: 'Fıstıklı baklava, 2 dilim' }
      ];
      localStorage.setItem('offlineMenu', JSON.stringify(defaultMenu));
    }
    
    // Masalar kontrolü
    if (!localStorage.getItem('offlineMasalar')) {
      const defaultMasalar = Array.from({ length: 10 }, (_, index) => ({
        id: `masa${index + 1}`,
        masaNumarasi: index + 1,
        durum: 'bos'
      }));
      localStorage.setItem('offlineMasalar', JSON.stringify(defaultMasalar));
    }
    
    // Siparişler kontrolü
    if (!localStorage.getItem('offlineSiparisler')) {
      localStorage.setItem('offlineSiparisler', JSON.stringify([]));
    }
    
    // Bildirimler kontrolü
    if (!localStorage.getItem('offlineBildirimler')) {
      localStorage.setItem('offlineBildirimler', JSON.stringify({
        garson: [],
        mutfak: [],
        kasa: []
      }));
    }
    
    // Ciro bilgileri kontrolü
    if (!localStorage.getItem('offlineCiro')) {
      localStorage.setItem('offlineCiro', JSON.stringify([]));
    }
    
    console.log('Çevrimdışı veritabanı başlatıldı');
  }
  
  // Firestore metotlarının taklitleri
  collection(name) {
    return {
      // Tüm belgeleri al
      get: () => {
        return new Promise((resolve) => {
          const storageKey = `offline${name.charAt(0).toUpperCase() + name.slice(1)}`;
          const data = JSON.parse(localStorage.getItem(storageKey) || '[]');
          
          resolve({
            docs: data.map(item => ({
              id: item.id,
              data: () => item,
              exists: true
            }))
          });
        });
      },
      
      // Belirli bir belgeyi al
      doc: (id) => ({
        get: () => {
          return new Promise((resolve) => {
            const storageKey = `offline${name.charAt(0).toUpperCase() + name.slice(1)}`;
            const data = JSON.parse(localStorage.getItem(storageKey) || '[]');
            const item = data.find(i => i.id === id);
            
            resolve({
              id: id,
              data: () => item,
              exists: !!item
            });
          });
        },
        
        // Belgeyi güncelle
        update: (updates) => {
          return new Promise((resolve) => {
            const storageKey = `offline${name.charAt(0).toUpperCase() + name.slice(1)}`;
            const data = JSON.parse(localStorage.getItem(storageKey) || '[]');
            const index = data.findIndex(i => i.id === id);
            
            if (index !== -1) {
              data[index] = { ...data[index], ...updates };
              localStorage.setItem(storageKey, JSON.stringify(data));
            }
            
            resolve();
          });
        },
        
        // Belgeyi sil
        delete: () => {
          return new Promise((resolve) => {
            const storageKey = `offline${name.charAt(0).toUpperCase() + name.slice(1)}`;
            const data = JSON.parse(localStorage.getItem(storageKey) || '[]');
            const newData = data.filter(i => i.id !== id);
            
            localStorage.setItem(storageKey, JSON.stringify(newData));
            resolve();
          });
        }
      }),
      
      // Belge ekle
      add: (newItem) => {
        return new Promise((resolve) => {
          const storageKey = `offline${name.charAt(0).toUpperCase() + name.slice(1)}`;
          const data = JSON.parse(localStorage.getItem(storageKey) || '[]');
          const newId = `${name}${Date.now()}`;
          const newDoc = { id: newId, ...newItem };
          
          data.push(newDoc);
          localStorage.setItem(storageKey, JSON.stringify(data));
          
          resolve({ id: newId });
        });
      },
      
      // Sorgu fonksiyonları (basit filtreler)
      where: (field, operator, value) => ({
        where: (field2, operator2, value2) => ({
          get: () => {
            return new Promise((resolve) => {
              const storageKey = `offline${name.charAt(0).toUpperCase() + name.slice(1)}`;
              let data = JSON.parse(localStorage.getItem(storageKey) || '[]');
              
              // İlk filtre
              if (operator === '==') {
                data = data.filter(item => item[field] === value);
              } else if (operator === 'in') {
                data = data.filter(item => value.includes(item[field]));
              }
              
              // İkinci filtre (varsa)
              if (field2 && operator2) {
                if (operator2 === '==') {
                  data = data.filter(item => item[field2] === value2);
                } else if (operator2 === 'in') {
                  data = data.filter(item => value2.includes(item[field2]));
                }
              }
              
              resolve({
                docs: data.map(item => ({
                  id: item.id,
                  data: () => item,
                  exists: true
                }))
              });
            });
          },
          orderBy: () => ({
            get: () => {
              return new Promise((resolve) => {
                const storageKey = `offline${name.charAt(0).toUpperCase() + name.slice(1)}`;
                let data = JSON.parse(localStorage.getItem(storageKey) || '[]');
                
                // Filtreler
                if (operator === '==') {
                  data = data.filter(item => item[field] === value);
                } else if (operator === 'in') {
                  data = data.filter(item => value.includes(item[field]));
                }
                
                if (field2 && operator2) {
                  if (operator2 === '==') {
                    data = data.filter(item => item[field2] === value2);
                  } else if (operator2 === 'in') {
                    data = data.filter(item => value2.includes(item[field2]));
                  }
                }
                
                resolve({
                  docs: data.map(item => ({
                    id: item.id,
                    data: () => item,
                    exists: true
                  }))
                });
              });
            }
          })
        }),
        get: () => {
          return new Promise((resolve) => {
            const storageKey = `offline${name.charAt(0).toUpperCase() + name.slice(1)}`;
            let data = JSON.parse(localStorage.getItem(storageKey) || '[]');
            
            if (operator === '==') {
              data = data.filter(item => item[field] === value);
            } else if (operator === 'in') {
              data = data.filter(item => value.includes(item[field]));
            }
            
            resolve({
              docs: data.map(item => ({
                id: item.id,
                data: () => item,
                exists: true
              }))
            });
          });
        },
        orderBy: () => ({
          get: () => {
            return new Promise((resolve) => {
              const storageKey = `offline${name.charAt(0).toUpperCase() + name.slice(1)}`;
              let data = JSON.parse(localStorage.getItem(storageKey) || '[]');
              
              if (operator === '==') {
                data = data.filter(item => item[field] === value);
              } else if (operator === 'in') {
                data = data.filter(item => value.includes(item[field]));
              }
              
              resolve({
                docs: data.map(item => ({
                  id: item.id,
                  data: () => item,
                  exists: true
                }))
              });
            });
          }
        })
      }),
      orderBy: () => ({
        get: () => {
          return new Promise((resolve) => {
            const storageKey = `offline${name.charAt(0).toUpperCase() + name.slice(1)}`;
            const data = JSON.parse(localStorage.getItem(storageKey) || '[]');
            
            resolve({
              docs: data.map(item => ({
                id: item.id,
                data: () => item,
                exists: true
              }))
            });
          });
        }
      })
    };
  }
}

// Realtime DB taklidi
class OfflineRealtimeDB {
  constructor() {}
  
  ref(path) {
    return {
      push: (data) => {
        return new Promise((resolve) => {
          const [_, role] = path.split('/');
          const bildirimler = JSON.parse(localStorage.getItem('offlineBildirimler') || '{}');
          
          if (!bildirimler[role]) {
            bildirimler[role] = [];
          }
          
          const newId = `notification${Date.now()}`;
          const newNotification = { id: newId, ...data };
          
          bildirimler[role].push(newNotification);
          localStorage.setItem('offlineBildirimler', JSON.stringify(bildirimler));
          
          resolve({
            key: newId,
            ref: {
              remove: () => {
                return new Promise((resolve) => {
                  const bildirimler = JSON.parse(localStorage.getItem('offlineBildirimler') || '{}');
                  
                  if (bildirimler[role]) {
                    bildirimler[role] = bildirimler[role].filter(item => item.id !== newId);
                    localStorage.setItem('offlineBildirimler', JSON.stringify(bildirimler));
                  }
                  
                  resolve();
                });
              }
            }
          });
        });
      },
      on: (event, callback) => {
        if (event === 'child_added') {
          const [_, role] = path.split('/');
          const bildirimler = JSON.parse(localStorage.getItem('offlineBildirimler') || '{}');
          
          if (bildirimler[role]) {
            bildirimler[role].forEach(notification => {
              callback({
                val: () => notification,
                ref: {
                  remove: () => {
                    const bildirimler = JSON.parse(localStorage.getItem('offlineBildirimler') || '{}');
                    bildirimler[role] = bildirimler[role].filter(item => item.id !== notification.id);
                    localStorage.setItem('offlineBildirimler', JSON.stringify(bildirimler));
                  }
                }
              });
            });
            
            // Bildirimleri işledikten sonra temizle
            bildirimler[role] = [];
            localStorage.setItem('offlineBildirimler', JSON.stringify(bildirimler));
          }
        }
      }
    };
  }
}

// Auth taklidi
class OfflineAuth {
  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }
  
  signInAnonymously() {
    return new Promise((resolve) => {
      this.currentUser = { uid: 'anonymous-user' };
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      resolve({ user: this.currentUser });
    });
  }
  
  signOut() {
    return new Promise((resolve) => {
      this.currentUser = null;
      localStorage.removeItem('currentUser');
      resolve();
    });
  }
  
  onAuthStateChanged(callback) {
    if (this.currentUser) {
      callback(this.currentUser);
    } else {
      callback(null);
    }
  }
}

// Firebase benzeri nesne oluştur
const firestore = new OfflineDataService();
const realdb = new OfflineRealtimeDB();
const auth = new OfflineAuth();

// Firestore koleksiyonları
const menuCollection = firestore.collection('menu');
const masalarCollection = firestore.collection('masalar');
const siparislerCollection = firestore.collection('siparisler');
const ciroCollection = firestore.collection('ciro');

// Firebase benzeri diğer nesneler
const FieldValue = {
  serverTimestamp: () => new Date().toISOString()
};

const ServerValue = {
  TIMESTAMP: new Date().toISOString()
};

// Yardımcı fonksiyonlar
function logout() {
  return new Promise((resolve) => {
    auth.signOut()
      .then(() => {
        resolve();
      })
      .catch(error => {
        console.error('Çıkış hatası:', error);
        resolve();
      });
  });
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

// Dışa aktar
console.log('Offline servis başlatıldı!'); 