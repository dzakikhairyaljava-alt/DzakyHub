
function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  if (email === "admin@gmail.com" && pass === "admin123") {
    window.location.href = "admin.html";
  } else {
    window.location.href = "user.html";
  }
}

function simpan() {
  const nama = document.getElementById("nama").value;
  const jenis = document.getElementById("jenis").value;
  let jumlah = document.getElementById("jumlah").value;
  jumlah = jumlah.replace(/\./g, "");
  jumlah = parseInt(jumlah);

  if (!nama || !jumlah) {
    alert("Lengkapi");
    return;
  }

  let data = JSON.parse(localStorage.getItem(jenis)) || [];
  data.unshift({
    nama: nama,
    jumlah: jumlah,
    tanggal: new Date().toLocaleDateString()
  });

  localStorage.setItem(jenis, JSON.stringify(data));
  alert("Jazakallahu khairan");
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
  let data = JSON.parse(localStorage.getItem(jenis)) || [];
  data.splice(index, 1);
  localStorage.setItem(jenis, JSON.stringify(data));
  tampil(jenis);
}

function rekap(teks) {
  document.getElementById("total").innerText = "Rekap " + teks;
}
