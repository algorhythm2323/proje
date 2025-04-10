// Çevrimdışı veri kullanımı için başlangıç verileri
const offlineData = {
  menu: [
    { id: 'menu1', ad: 'Izgara Köfte', fiyat: 80, kategori: 'yemekler', aciklama: 'İki adet ızgara köfte, patates kızartması ve salata ile' },
    { id: 'menu2', ad: 'Tavuk Şiş', fiyat: 70, kategori: 'yemekler', aciklama: 'Marine edilmiş tavuk şiş, pilav ve közlenmiş sebzeler ile' },
    { id: 'menu3', ad: 'Karışık Pizza', fiyat: 90, kategori: 'yemekler', aciklama: 'Sucuk, mantar, zeytin, mısır ve kaşar peyniri ile' },
    { id: 'menu4', ad: 'Coca Cola', fiyat: 15, kategori: 'icecekler', aciklama: '330ml kutu' },
    { id: 'menu5', ad: 'Ayran', fiyat: 10, kategori: 'icecekler', aciklama: '300ml' },
    { id: 'menu6', ad: 'Çay', fiyat: 5, kategori: 'icecekler', aciklama: 'Demlik çay' },
    { id: 'menu7', ad: 'Künefe', fiyat: 45, kategori: 'tatlilar', aciklama: 'Fıstıklı künefe, dondurma ile servis edilir' },
    { id: 'menu8', ad: 'Baklava', fiyat: 40, kategori: 'tatlilar', aciklama: 'Fıstıklı baklava, 2 dilim' }
  ],
  masalar: [
    { id: 'masa1', masaNumarasi: 1, durum: 'bos' },
    { id: 'masa2', masaNumarasi: 2, durum: 'bos' },
    { id: 'masa3', masaNumarasi: 3, durum: 'bos' },
    { id: 'masa4', masaNumarasi: 4, durum: 'bos' },
    { id: 'masa5', masaNumarasi: 5, durum: 'bos' },
    { id: 'masa6', masaNumarasi: 6, durum: 'bos' },
    { id: 'masa7', masaNumarasi: 7, durum: 'bos' },
    { id: 'masa8', masaNumarasi: 8, durum: 'bos' },
    { id: 'masa9', masaNumarasi: 9, durum: 'bos' },
    { id: 'masa10', masaNumarasi: 10, durum: 'bos' }
  ],
  siparisler: []
};

// LocalStorage'a başlangıç verilerini kaydet (eğer mevcut değilse)
function initializeOfflineData() {
  if (!localStorage.getItem('offlineMenu')) {
    localStorage.setItem('offlineMenu', JSON.stringify(offlineData.menu));
  }
  
  if (!localStorage.getItem('offlineMasalar')) {
    localStorage.setItem('offlineMasalar', JSON.stringify(offlineData.masalar));
  }
  
  if (!localStorage.getItem('offlineSiparisler')) {
    localStorage.setItem('offlineSiparisler', JSON.stringify(offlineData.siparisler));
  }
  
  console.log('Çevrimdışı veriler başlatıldı');
}

// Çevrimdışı veri servisini başlat
initializeOfflineData(); 