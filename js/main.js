// --- Navbar Mobile ---
document.getElementById("menu-btn").addEventListener("click", () => {
  document.getElementById("mobile-menu").classList.toggle("hidden");
});

// --- Animasi Scroll ---
const faders = document.querySelectorAll(".fade-in");
function showElements() {
  faders.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", showElements);
showElements();

// --- Variabel Lokasi ---
let userLocation = null;
const locationWarning = document.getElementById("location-warning");

// --- Permintaan Izin Lokasi ---
function requestLocation() {
  if (!navigator.geolocation) {
    alert("Browser kamu tidak mendukung fitur lokasi.");
    showLocationWarning(
      "Browser tidak mendukung deteksi lokasi. Silakan gunakan browser lain seperti Chrome atau Edge."
    );
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLocation = {
        lat: position.coords.latitude.toFixed(6),
        lon: position.coords.longitude.toFixed(6),
      };
      locationWarning?.classList.add("hidden");
      document.body.classList.remove("no-access");
      console.log("Lokasi berhasil didapat:", userLocation);
    },
    (error) => {
      let message = "";
      switch (error.code) {
        case error.PERMISSION_DENIED:
          message =
            "Kamu menolak memberikan izin lokasi. Website ini membutuhkan lokasi agar pemesanan bisa diverifikasi dan mencegah penipuan.";
          break;
        case error.POSITION_UNAVAILABLE:
          message =
            "Sinyal GPS atau jaringan tidak tersedia. Pastikan koneksi internet stabil dan GPS aktif.";
          break;
        case error.TIMEOUT:
          message =
            "Waktu permintaan lokasi habis. Silakan coba lagi dan pastikan GPS aktif.";
          break;
        default:
          message = "Terjadi kesalahan saat mengakses lokasi.";
      }
      showLocationWarning(message);
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
  );
}

// --- Tampilkan Peringatan Lokasi ---
function showLocationWarning(message) {
  if (locationWarning) {
    locationWarning.classList.remove("hidden");
    document.body.classList.add("no-access");
    const msgEl = document.getElementById("locationMessage");
    if (msgEl) msgEl.innerText = message;
  }
}

// Jalankan saat pertama kali halaman dibuka
window.addEventListener("load", requestLocation);

// --- Logika Belanja ---
const qty1 = document.getElementById("qty1");
const qty2 = document.getElementById("qty2");
const qty3 = document.getElementById("qty3");
const qty4 = document.getElementById("qty4");
const cartBtn = document.getElementById("cartBtn");
const confirmModal = document.getElementById("confirmModal");
const orderSummary = document.getElementById("orderSummary");
const cancelBtn = document.getElementById("cancelBtn");
const confirmBtn = document.getElementById("confirmBtn");

// Nomor WhatsApp tujuan
const phoneNumber = "6285796177243";

// Tampilkan tombol belanja hanya jika ada input
function checkCartVisibility() {
  if (
    qty1.value > 0 ||
    qty2.value > 0 ||
    qty3.value > 0 ||
    qty4.value > 0
  ) {
    cartBtn.classList.remove("hidden");
  } else {
    cartBtn.classList.add("hidden");
  }
}
[qty1, qty2, qty3, qty4].forEach((qty) =>
  qty.addEventListener("input", checkCartVisibility)
);

// Klik tombol belanja
cartBtn.addEventListener("click", () => {
  let pesan = "";
  if (qty1.value > 0)
    pesan += `• Paket Ayam Geprek + Mi Goreng x${qty1.value}\n`;
  if (qty2.value > 0)
    pesan += `• Geprek + Nasi + Tahu + Tempe x${qty2.value}\n`;
  if (qty3.value > 0) pesan += `• Mi Ayam + Tahu x${qty3.value}\n`;
  if (qty4.value > 0) pesan += `• Tahu Balado 1 Porsi x${qty4.value}\n`;

  orderSummary.textContent = pesan || "Belum ada pesanan.";
  confirmModal.classList.remove("hidden");
});

// Tombol Batal
cancelBtn.addEventListener("click", () => {
  confirmModal.classList.add("hidden");
});

// Tombol Yakin — kirim ke WhatsApp
confirmBtn.addEventListener("click", () => {
  let pesan = "";
  if (qty1.value > 0)
    pesan += `• Paket Ayam Geprek + Mi Goreng x${qty1.value}\n`;
  if (qty2.value > 0)
    pesan += `• Geprek + Nasi + Tahu + Tempe x${qty2.value}\n`;
  if (qty3.value > 0) pesan += `• Mi Ayam + Tahu x${qty3.value}\n`;
  if (qty4.value > 0) pesan += `• Tahu Balado 1 Porsi x${qty4.value}\n`;

  if (!pesan) {
    alert("Belum ada menu yang dipilih.");
    return;
  }

  let lokasiTeks = "";
  if (userLocation) {
    lokasiTeks = `\n\n📍 Lokasi pelanggan:\nhttps://www.google.com/maps?q=${userLocation.lat},${userLocation.lon}`;
  } else {
    lokasiTeks =
      "\n\n⚠️ Lokasi tidak terdeteksi (mungkin izin lokasi ditolak atau GPS mati).";
  }

  const encodedMsg = encodeURIComponent(
    `Halo Geprek Azizah! Saya ingin pesan:\n${pesan}${lokasiTeks}\n\nTerima kasih!`
  );

  window.open(`https://wa.me/${phoneNumber}?text=${encodedMsg}`, "_blank");
  confirmModal.classList.add("hidden");
});

function openPopup(imgElement) {
  const popup = document.getElementById("imgPopup");
  const popupImg = document.getElementById("popupImg");
  popup.style.display = "block";
  popupImg.src = imgElement.src;
}

function closePopup() {
  document.getElementById("imgPopup").style.display = "none";
};

