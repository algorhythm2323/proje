# Restoran Yönetim Sistemi - Ürün Gereksinim Belgesi (PRD)

## Proje Özeti
Bu proje, restoranlarda sipariş yönetimini kolaylaştırmak için üç farklı uygulama içeren entegre bir sistem geliştirmeyi amaçlar: Garson, Mutfak ve Kasa uygulamaları. Sistem, siparişlerin alınmasından hazırlanmasına ve ödeme alınmasına kadar tüm süreci dijitalleştirir.

## Kullanıcı Rolleri
1. **Garson**: Müşterilerden sipariş alan ve mutfakla iletişim kuran personel
2. **Mutfak Personeli**: Siparişleri hazırlayan ve durumunu güncelleyen personel
3. **Kasiyer**: Adisyon takibi ve ödeme işlemlerini yapan personel

## Uygulama Bileşenleri

### 1. Garson Uygulaması
- Masa seçme ve sipariş oluşturma
- Menü öğelerini görüntüleme ve seçme
- Siparişleri düzenleme ve iptal etme
- Mutfaktan gelen bildirimlerle sipariş durumunu takip etme
- Aktif masaları görüntüleme

### 2. Mutfak Uygulaması
- Gelen siparişleri gerçek zamanlı görüntüleme
- Siparişleri hazırlanıyor/hazır olarak işaretleme
- Garsona sipariş hazır bildirimi gönderme

### 3. Kasa Uygulaması
- Tüm aktif masaları ve adisyonları görüntüleme
- Masa bazlı sipariş detaylarını ve toplam tutarı görme
- Hesap kapatma ve ödeme alma
- Günlük/haftalık satış raporları oluşturma

## Temel Özellikler
- Gerçek zamanlı sipariş iletimi ve bildirimler
- Masa yönetimi ve adisyon takibi
- Menü yönetimi ve fiyatlandırma
- Kullanıcı kimlik doğrulama ve yetkilendirme
- Sipariş geçmişi ve raporlama

## Teknoloji Yığını
- **Frontend**: React.js ve Material-UI
- **Backend**: Node.js ve Express.js
- **Veritabanı**: Firebase Firestore
- **Gerçek Zamanlı İletişim**: Firebase Realtime Database
- **Kimlik Doğrulama**: Firebase Authentication

## İlerleme Durumu

### Tamamlanan İşler
- [ ] Proje yapısının oluşturulması
- [ ] Kullanıcı arayüzü tasarımı
- [ ] Firebase entegrasyonu
- [ ] Temel kimlik doğrulama sistemi
- [ ] Menü yönetimi

### Yapılacak İşler
- [ ] Garson uygulaması geliştirme
- [ ] Mutfak uygulaması geliştirme
- [ ] Kasa uygulaması geliştirme
- [ ] Gerçek zamanlı bildirim sistemi
- [ ] Adisyon ve ödeme işlemleri
- [ ] Test ve hata ayıklama
- [ ] Dağıtım ve belgelendirme 