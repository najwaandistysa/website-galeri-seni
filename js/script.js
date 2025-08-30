// js/script.js

document.addEventListener("DOMContentLoaded", function () {
  // --- Animasi Loading ---
  const loadingOverlay = document.getElementById("loadingOverlay");

  function showLoading() {
    if (loadingOverlay) {
      loadingOverlay.classList.remove("hidden");
    }
  }

  function hideLoading() {
    if (loadingOverlay && !loadingOverlay.classList.contains("hidden")) {
      loadingOverlay.classList.add("hidden");
    }
  }

  // Sembunyikan loading setelah DOM dimuat sepenuhnya
  hideLoading();

  // Tampilkan loading saat akan berpindah halaman (sebelum unload)
  window.addEventListener("beforeunload", showLoading);

  // --- Validasi Password (untuk kontak.html atau halaman pendaftaran) ---
  // Pastikan elemen password ada di halaman, karena tidak semua halaman punya
  const passwordInput = document.getElementById("password"); // Bisa ada di kontak.html dan login.html
  const passwordError = document.getElementById("passwordError"); // Bisa ada di kontak.html dan login.html
  const contactForm = document.getElementById("contactForm"); // Form utama di kontak.html

  if (passwordInput && passwordError) {
    // Menambahkan event listener pada form submit jika ada password input
    if (contactForm) { // Hanya untuk form kontak
      contactForm.addEventListener("submit", function (event) {
        // Hanya jalankan validasi password jika input password tidak kosong
        if (passwordInput.value !== "") {
          const passwordIsValid = validatePassword();
          if (!passwordIsValid) {
            event.preventDefault(); // Mencegah form submit jika password tidak valid
          }
        }
      });
    }
    passwordInput.addEventListener("input", validatePassword); // Validasi saat input berubah
  }

  function validatePassword() {
    if (!passwordInput || !passwordError) return true; // Keluar jika elemen tidak ada

    const password = passwordInput.value;
    let isValid = true;
    let errorMessage = "";

    // Minimal 8 karakter
    if (password.length < 8) {
      errorMessage += "Password minimal 8 karakter. ";
      isValid = false;
    }

    // Mengandung huruf besar
    if (!/[A-Z]/.test(password)) {
      errorMessage += "Harus mengandung huruf besar. ";
      isValid = false;
    }

    // Mengandung huruf kecil
    if (!/[a-z]/.test(password)) {
      errorMessage += "Harus mengandung huruf kecil. ";
      isValid = false;
    }

    // Harus mengandung angka
    if (!/[0-9]/.test(password)) {
      errorMessage += "Harus mengandung angka. ";
      isValid = false;
    }

    // Hapus penanganan passwordInput.classList.add/remove("is-valid") di sini
    // dan biarkan penanganan global di bawah jika tidak ada password input kosong.

    if (!isValid) {
      passwordInput.classList.add("is-invalid");
      passwordInput.classList.remove("is-valid"); // Pastikan valid juga dihapus
      passwordError.textContent = errorMessage.trim();
    } else {
      passwordInput.classList.remove("is-invalid");
      passwordInput.classList.add("is-valid"); // Tambahkan is-valid jika valid
      passwordError.textContent = "";
    }
    return isValid; // Mengembalikan status validasi
  }

  // --- Validasi Form Kontak (untuk kontak.html) ---
  // Pastikan elemen-elemen ini hanya diinisialisasi jika form kontak ada
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  if (contactForm && nameInput && emailInput && messageInput) {
    // Pastikan elemen form kontak ada
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Mencegah form submit default
      let formIsValid = true;

      // Validasi Nama
      if (nameInput.value.length < 5 || nameInput.value.length > 20) {
        nameInput.classList.add("is-invalid");
        nameInput.classList.remove("is-valid");
        nameError.textContent = "Nama harus antara 5 dan 20 karakter.";
        formIsValid = false;
      } else {
        nameInput.classList.remove("is-invalid");
        nameInput.classList.add("is-valid");
        nameError.textContent = "";
      }

      // Validasi Email (menggunakan HTML5 checkValidity() dan custom)
      if (!emailInput.checkValidity()) {
        emailInput.classList.add("is-invalid");
        emailInput.classList.remove("is-valid");
        emailError.textContent = "Format email tidak valid.";
        formIsValid = false;
      } else {
        emailInput.classList.remove("is-invalid");
        emailInput.classList.add("is-valid");
        emailError.textContent = "";
      }

      // Validasi Pesan (Contoh: minimal 10 karakter, maksimal 500)
      if (messageInput.value.length < 10 || messageInput.value.length > 500) {
        messageInput.classList.add("is-invalid");
        messageInput.classList.remove("is-valid");
        messageError.textContent = "Pesan harus antara 10 dan 500 karakter.";
        formIsValid = false;
      } else {
        messageInput.classList.remove("is-invalid");
        messageInput.classList.add("is-valid");
        messageError.textContent = "";
      }

      // Validasi password jika ada dan tidak kosong
      if (passwordInput && passwordInput.value !== "") {
        const passwordIsValid = validatePassword();
        if (!passwordIsValid) {
          formIsValid = false;
        }
      }

      if (formIsValid) {
        alert("Pesan Anda berhasil dikirim!");
        contactForm.reset(); // Mengosongkan form
        // Hapus kelas validasi setelah reset
        nameInput.classList.remove("is-valid", "is-invalid");
        emailInput.classList.remove("is-valid", "is-invalid");
        messageInput.classList.remove("is-valid", "is-invalid");
        if (passwordInput) {
          passwordInput.classList.remove("is-valid", "is-invalid");
          passwordError.textContent = "";
        }
      }
    });

    // Event listener untuk validasi real-time saat input Nama berubah
    nameInput.addEventListener("input", function () {
      if (this.value.length >= 5 && this.value.length <= 20) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
        nameError.textContent = "";
      } else {
        this.classList.add("is-invalid");
        this.classList.remove("is-valid");
        nameError.textContent = "Nama harus antara 5 dan 20 karakter.";
      }
    });

    // Event listener untuk validasi real-time saat input Email berubah
    emailInput.addEventListener("input", function () {
      if (this.checkValidity()) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
        emailError.textContent = "";
      } else {
        this.classList.add("is-invalid");
        this.classList.remove("is-valid");
        emailError.textContent = "Format email tidak valid.";
      }
    });

    // Event listener untuk validasi real-time saat input Pesan berubah
    messageInput.addEventListener("input", function () {
      if (this.value.length >= 10 && this.value.length <= 500) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
        messageError.textContent = "";
      } else {
        this.classList.add("is-invalid");
        this.classList.remove("is-valid");
        messageError.textContent = "Pesan harus antara 10 dan 500 karakter.";
      }
    });
  }

  // --- Smooth Scrolling ---
  const smoothScrollButtons = document.querySelectorAll('.smooth-scroll-btn');

  smoothScrollButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Periksa apakah navbar ada di halaman ini
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        let offsetPosition;

        if (targetId === '#top-of-page-collection') {
          offsetPosition = 0;
        } else {
          const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          // Kurangi tinggi navbar jika ada, dan tambahkan sedikit offset
          offsetPosition = elementPosition - navbarHeight - 20;
          offsetPosition = Math.max(0, offsetPosition);
        }

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        console.warn(`Elemen target dengan ID "${targetId}" tidak ditemukan.`);
      }
    });
  });

  // --- Filter Karya Seni di Halaman Pameran ---
  const filterButtons = document.querySelectorAll('.btn[data-filter]');
  const artGallery = document.getElementById('art-gallery');

  if (filterButtons.length > 0 && artGallery) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function () {
        // Hapus kelas 'active' dari semua tombol
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Tambahkan kelas 'active' ke tombol yang diklik
        this.classList.add('active');

        const filterCategory = this.dataset.filter;
        const artCards = artGallery.querySelectorAll('.col-md-4.mb-4');

        artCards.forEach(card => {
          if (filterCategory === 'all' || card.dataset.category === filterCategory) {
            card.style.display = 'block'; // Tampilkan kartu
          } else {
            card.style.display = 'none'; // Sembunyikan kartu
          }
        });
      });
    });
  }

  // --- Logika Login untuk login.html ---
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const loginPasswordInput = document.getElementById("password"); // Nama variabel berbeda agar tidak bentrok dengan passwordInput global
  const usernameError = document.getElementById("usernameError");
  const loginErrorMessage = document.getElementById("loginErrorMessage"); // Untuk pesan error umum login

  if (loginForm && usernameInput && loginPasswordInput) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Mencegah form submit default

      let loginFormIsValid = true;

      // Validasi Username (contoh: minimal 3 karakter, tidak boleh kosong)
      if (usernameInput.value.length < 3 || usernameInput.value.trim() === "") {
        usernameInput.classList.add("is-invalid");
        usernameInput.classList.remove("is-valid");
        usernameError.textContent = "Nama pengguna minimal 3 karakter.";
        loginFormIsValid = false;
      } else {
        usernameInput.classList.remove("is-invalid");
        usernameInput.classList.add("is-valid");
        usernameError.textContent = "";
      }

      // Validasi Password (gunakan fungsi validatePassword yang sudah ada)
      // Namun, karena ini login, kita tidak terlalu ketat di frontend, hanya cek kosong
      if (loginPasswordInput.value.trim() === "") {
        loginPasswordInput.classList.add("is-invalid");
        loginPasswordInput.classList.remove("is-valid");
        passwordError.textContent = "Kata sandi tidak boleh kosong."; // Gunakan passwordError dari konteks login
        loginFormIsValid = false;
      } else {
        loginPasswordInput.classList.remove("is-invalid");
        loginPasswordInput.classList.add("is-valid");
        passwordError.textContent = "";
      }

      // SIMULASI LOGIN BERHASIL
      // Untuk demo ini, kita akan menggunakan username "admin" dan password "admin123"
      const correctUsername = "najwa";
      const correctPassword = "najwaandisty27";

      if (loginFormIsValid) { // Pastikan input secara format valid dulu
        if (usernameInput.value === correctUsername && loginPasswordInput.value === correctPassword) {
          // Login Berhasil
          loginErrorMessage.style.display = "none"; // Sembunyikan pesan error
          alert("Login berhasil! Anda akan diarahkan ke Beranda.");
          showLoading(); // Tampilkan loading sebelum redirect
          setTimeout(() => {
            window.location.href = "index.html"; // Arahkan ke halaman beranda
          }, 500); // Penundaan singkat untuk animasi loading
        } else {
          // Login Gagal
          loginErrorMessage.style.display = "block"; // Tampilkan pesan error umum
          loginFormIsValid = false; // Set status form tidak valid
          usernameInput.classList.add("is-invalid"); // Beri feedback visual error
          loginPasswordInput.classList.add("is-invalid");
        }
      }
    });

    // Real-time validation for username in login form
    usernameInput.addEventListener("input", function () {
      if (this.value.length >= 3 && this.value.trim() !== "") {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
        usernameError.textContent = "";
      } else {
        this.classList.add("is-invalid");
        this.classList.remove("is-valid");
        usernameError.textContent = "Nama pengguna minimal 3 karakter.";
      }
    });

    // Real-time validation for password in login form (just check if empty)
    loginPasswordInput.addEventListener("input", function () {
      if (this.value.trim() !== "") {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
        passwordError.textContent = "";
      } else {
        this.classList.add("is-invalid");
        this.classList.remove("is-valid");
        passwordError.textContent = "Kata sandi tidak boleh kosong.";
      }
    });
  }
});