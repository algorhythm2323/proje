# Restoran Yönetim Sistemi

Restoran Yönetim Sistemi, restoranların sipariş alma, mutfak yönetimi ve ödeme işlemlerini entegre bir şekilde yönetebilmesi için tasarlanmış bir web uygulamasıdır. Garson, mutfak ve kasa rolleri arasında gerçek zamanlı iletişim sağlayarak restoran operasyonlarını kolaylaştırır.

## Özellikler

### Garson Uygulaması
- Masa yönetimi (boş, dolu, hesap bekleyen)
- Menüden sipariş oluşturma
- Siparişleri mutfağa iletme
- Hesap isteme

### Mutfak Uygulaması
- Gelen siparişleri görüntüleme
- Sipariş durumunu güncelleme (beklemede, hazırlanıyor, hazır)
- Hazır olan siparişleri garsona bildirme

### Kasa Uygulaması
- Hesap bekleyen masaları görüntüleme
- Masa adisyonlarını görüntüleme
- Ödeme işlemlerini tamamlama
- Günlük satış istatistikleri

## Kurulum

### Gereksinimler
- Web sunucusu (Apache, Nginx) veya yerel sunucu (Live Server, http-server)
- Tarayıcı (Chrome, Firefox, Safari)

### Lokal Olarak Çalıştırma
1. Projeyi indirin veya klonlayın
2. Proje klasörüne gidin
3. Aşağıdaki yöntemlerden birini kullanarak bir web sunucusu başlatın:

#### Python HTTP Sunucusu
```
python -m http.server
```
veya
```
python3 -m http.server
```

#### Node.js HTTP Sunucusu
```
npx http-server
```

#### VS Code Live Server
1. Visual Studio Code'da "Live Server" eklentisini yükleyin
2. index.html dosyasını açın
3. Sağ tıklayıp "Open with Live Server" seçeneğini seçin

## Kullanım

### Online Mod (Firebase ile)

Sistemin tüm özelliklerinden faydalanmak için Firebase'e bağlanabilirsiniz:

1. `js/firebase-config.js` dosyasını açın
2. Firebase projenizin bilgilerini doldurun:
```javascript
// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "FIREBASE_API_KEY",
  authDomain: "PROJE_ID.firebaseapp.com",
  projectId: "PROJE_ID",
  storageBucket: "PROJE_ID.appspot.com",
  messagingSenderId: "MESSAGING_ID",
  appId: "APP_ID",
  databaseURL: "https://PROJE_ID.firebaseio.com"
};
```

3. Firebase konsolunda Firestore ve Realtime Database'i etkinleştirin
4. Veritabanı kurallarını geliştirme için aşağıdaki gibi ayarlayın:

**Firestore Kuralları:**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Realtime Database Kuralları:**
```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

5. Örnek veri oluşturmak için Firebase konsolunda veya tarayıcı konsolunda `data-init.js` dosyasını çalıştırabilirsiniz

### Çevrimdışı Mod

İnternet bağlantısı olmadan veya Firebase kurulumu yapmadan çalışmak için:

1. İndeksin dosyaları çevrimdışı mod ile yüklenecek şekilde ayarlanmıştır
2. LocalStorage kullanarak sipariş, masa ve menü verilerinizi yerel olarak saklayabilirsiniz
3. Çevrimdışı mod otomatik olarak aktif olur ve örnek veriler oluşturulur

## Rol Giriş Bilgileri

Sistemde üç farklı rol bulunmaktadır:

1. **Garson**: Masaları yönetir, siparişleri alır ve mutfağa iletir
2. **Mutfak**: Gelen siparişleri görüntüler ve durumlarını günceller
3. **Kasa**: Hesapları görüntüler ve ödeme işlemlerini tamamlar

Anonim giriş kullanıldığı için her rol için ayrı bir giriş bilgisi gerekmemektedir. Ana sayfadan ilgili rolü seçerek giriş yapabilirsiniz.

## Dosya Yapısı

```
restoran-sistem/
│
├── index.html           # Ana giriş sayfası
├── css/
│   └── style.css        # Ana stil dosyası
├── js/
│   ├── firebase-config.js    # Firebase yapılandırması
│   ├── main.js               # Ortak yardımcı fonksiyonlar
│   └── offline-service.js    # Çevrimdışı mod servisi
├── garson/
│   └── index.html       # Garson uygulaması
├── mutfak/
│   └── index.html       # Mutfak uygulaması
├── kasa/
│   └── index.html       # Kasa uygulaması
├── data-init.js         # Örnek veri oluşturma
└── README.md            # Proje dökümantasyonu
```

## Örnek Veri

Sistem, çevrimdışı modda örnek verilerle çalışır:

- **Menü Öğeleri**: Izgara Köfte, Tavuk Şiş, Pizza, İçecekler ve Tatlılar
- **Masalar**: 10 adet masa
- **Sipariş Durumları**: Beklemede, Hazırlanıyor, Hazır, Tamamlandı

## Hata Giderme

1. **Giriş Hataları**: Tarayıcı konsolunu açarak hata mesajlarını kontrol edin
2. **Sayfa Yüklenmiyor**: Dosyaların `file://` protokolü yerine bir HTTP sunucusu üzerinden sunulduğundan emin olun
3. **Veriler Görünmüyor**: Çevrimdışı mod LocalStorage'ı kullanır; tarayıcı ayarlarınızın çerezlere ve yerel depolamaya izin verdiğinden emin olun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## İletişim

Sorularınız veya önerileriniz için: info@example.com 