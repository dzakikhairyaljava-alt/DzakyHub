function login() {
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("password").value.trim();

  if (!email || !pass) {
    alert("Email dan password wajib diisi");
    return;
  }

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailValid.test(email)) {
    alert("Email salah");
    return;
  }


  if (email === "admin@gmail.com" && pass === "admin123") {
    window.location.href = "admin.html";
    return;
  }


  if (pass.length >= 6) {
    window.location.href = "user.html";
    return;
  }


  alert("Email atau password salah");
}




function simpan() {
  const nama = document.getElementById("nama").value.trim();
  const jenis = document.getElementById("jenis").value;
  const jumlahInput = document.getElementById("jumlah").value;

  // 1. semua kosong
  if (nama === "" && jumlahInput === "") {
    alert("Lengkapi semua data");
    return;
  }

  // 2. nama kosong
  if (nama === "") {
    alert("Masukkan nama");
    return;
  }

  // 3. jumlah kosong
  if (jumlahInput === "") {
    alert("Masukkan jumlah");
    return;
  }

  // ubah jumlah ke angka
  let jumlah = parseInt(jumlahInput);

  if (isNaN(jumlah) || jumlah <= 0) {
    alert("Jumlah tidak valid");
    return;
  }

  // ambil data lama
  let data = JSON.parse(localStorage.getItem(jenis)) || [];

  // simpan data baru
  data.unshift({
    nama: nama,
    jumlah: jumlah,
    tanggal: new Date().toLocaleDateString()
  });

  localStorage.setItem(jenis, JSON.stringify(data));
  alert("Jazakallahu khairan");

  // reset input
  document.getElementById("nama").value = "";
  document.getElementById("jumlah").value = "";
}


function rupiah(angka) {
  return angka.toLocaleString("id-ID");
}

function tampil(jenis) {
  let data = JSON.parse(localStorage.getItem(jenis)) || [];
  let tbody = document.getElementById("data");
  let total = 0;
  tbody.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    total += data[i].jumlah;
    tbody.innerHTML += `
      <tr>
        <td>${data[i].nama}</td>
        <td>Rp ${rupiah(data[i].jumlah)}</td>
        <td>${data[i].tanggal}</td>
        <td>
          <button class="btn-hapus" onclick="hapus('${jenis}', ${i})">
          Hapus
          </button>
        </td>
      </tr>
    `;
  }
  document.getElementById("total").innerText ="Total Uang: Rp " + rupiah(total);
}

function hapus(jenis, index) {
  const yakin = confirm("Hapus data?");

  if (!yakin) {
    return;
  }

  let data = JSON.parse(localStorage.getItem(jenis)) || [];
  data.splice(index, 1);
  localStorage.setItem(jenis, JSON.stringify(data));
  tampil(jenis);
}


function rekap(teks) {
  document.getElementById("total").innerText = "Rekap " + teks;
}


let jenisAktif = "";

function pilihJenis(btn, jenis) {
  jenisAktif = jenis; // simpan pilihan

  // matikan semua tombol jenis
  document.querySelectorAll(".jenis").forEach(b => b.classList.remove("active"));

  // aktifkan tombol yang ditekan
  btn.classList.add("active");

  // matikan semua tombol rekap
  document.querySelectorAll(".rekap").forEach(b => b.classList.remove("active"));

  // hapus isi tabel & total
  document.getElementById("data").innerHTML = "";
  document.getElementById("total").innerText = "";
}


function pilihRekap(btn, teks) {
  if (jenisAktif === "") {
    alert("Pilih Infaq / Zakat / Wakaf dulu");
    return;
  }

  // matikan semua tombol rekap
  document.querySelectorAll(".rekap").forEach(b => b.classList.remove("active"));

  // aktifkan tombol yang ditekan
  btn.classList.add("active");

  tampil(jenisAktif);

document.getElementById("total").innerText =
  document.getElementById("total").innerText + "\nRekap " + teks + ":";

}
