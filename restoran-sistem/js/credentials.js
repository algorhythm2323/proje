// Kullanıcı giriş verileri
const USERS = {
  // Garson Hesapları
  garson1: {
    email: "garson1@restoran.com",
    password: "garson123",
    role: "garson",
    name: "Ahmet Yılmaz (Garson)",
  },
  garson2: {
    email: "garson2@restoran.com",
    password: "garson456",
    role: "garson",
    name: "Mehmet Kaya (Garson)",
  },
  garson4: {
    email: "garson4@restoran.com",
    password: "garson4567",
    role: "garson",
    name: "Mehmet (Garson)",
  },
  garson3: {
    email: "elif.garson@restoran.com",
    password: "elif789",
    role: "garson",
    name: "Elif Demir (Garson)",
  },

  // Mutfak Hesapları
  mutfak1: {
    email: "mutfak1@restoran.com",
    password: "mutfak123",
    role: "mutfak",
    name: "Ali Özkan (Şef)",
  },
  mutfak2: {
    email: "mutfak2@restoran.com",
    password: "mutfak456",
    role: "mutfak",
    name: "Fatma Şahin (Aşçı)",
  },
  mutfak3: {
    email: "adem.chef@restoran.com",
    password: "chef789",
    role: "mutfak",
    name: "Adem Çelik (Sous Chef)",
  },

  // Kasa Hesapları
  kasa1: {
    email: "kasa1@restoran.com",
    password: "kasa123",
    role: "kasa",
    name: "Ayşe Yıldız (Kasiyer)",
  },
  kasa2: {
    email: "kasa2@restoran.com",
    password: "kasa456",
    role: "kasa",
    name: "Mustafa Aydın (Muhasebe)",
  },
  kasa3: {
    email: "zeynep.kasa@restoran.com",
    password: "zeynep789",
    role: "kasa",
    name: "Zeynep Arslan (Mali Müşavir)",
  },

  // Yönetici Hesapları
  yonetici1: {
    email: "yonetici@restoran.com",
    password: "admin2024",
    role: "garson", // Yönetici garson yetkilerine sahip
    name: "İbrahim Öztürk (Genel Müdür)",
  },
  yonetici2: {
    email: "mudur@restoran.com",
    password: "manager123",
    role: "kasa", // Müdür kasa yetkilerine sahip
    name: "Selin Koç (İşletme Müdürü)",
  },
};

// Giriş doğrulama fonksiyonu
function validateLogin(email, password) {
  for (let role in USERS) {
    const user = USERS[role];
    if (user.email === email && user.password === password) {
      return {
        success: true,
        user: user,
      };
    }
  }
  return {
    success: false,
    message: "Email veya şifre hatalı!",
  };
}

// Kullanıcı oturumunu kaydetme
function saveUserSession(user) {
  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      uid: generateUID(),
      email: user.email,
      role: user.role,
      name: user.name,
      loginTime: new Date().toISOString(),
    })
  );
}

// Basit UID üreteci
function generateUID() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Oturum kontrolü
function checkUserSession() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return currentUser;
}

// Çıkış yapma
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "../index.html";
}
