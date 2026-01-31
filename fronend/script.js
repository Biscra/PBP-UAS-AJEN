const API = 'http://localhost:8000/api'
let editId = null

/* ================= LOAD KATEGORI ================= */
async function loadKategori() {
  try {
    const res = await fetch(`${API}/kategori`)
    const data = await res.json()

    const select = document.getElementById('id_kategori')
    select.innerHTML = '<option value="">-- Pilih Kategori --</option>'

    data.forEach(k => {
      const opt = document.createElement('option')
      opt.value = k.id_kategori
      opt.textContent = k.nama_kategori
      select.appendChild(opt)
    })
  } catch (err) {
    console.error('Gagal load kategori', err)
  }
}

/* ================= LOAD OBAT ================= */
async function loadObat() {
  try {
    const res = await fetch(`${API}/obat`)
    const data = await res.json()

    const tbody = document.getElementById('tableObat')
    tbody.innerHTML = ''

    data.forEach(o => {
      tbody.innerHTML += `
        <tr>
          <td>${o.nama_obat}</td>
          <td>${o.nama_kategori}</td>
          <td>Rp ${o.harga}</td>
          <td>
            <button onclick="editObat(${o.id_obat}, '${o.nama_obat}', ${o.id_kategori}, ${o.harga})">
              ✏️
            </button>
            <button onclick="hapusObat(${o.id_obat})">
              🗑️
            </button>
          </td>
        </tr>
      `
    })
  } catch (err) {
    console.error('Gagal load obat', err)
  }
}

/* ================= TAMBAH / UPDATE ================= */
document.getElementById('formObat').addEventListener('submit', async e => {
    e.preventDefault()

    const payload = {
        nama_obat: nama_obat.value,
        id_kategori: id_kategori.value,
        harga: harga.value
    }

    try {
        if (editId) {
        // UPDATE
        await fetch(`${API}/obat/${editId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        msg.textContent = 'Data berhasil diupdate'
        } else {
        // INSERT
        await fetch(`${API}/obat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        msg.textContent = 'Data berhasil ditambahkan'
        }

        msg.className = 'success'
        resetForm()
        loadObat()
    } catch (err) {
        msg.textContent = 'Gagal menyimpan data'
        msg.className = 'error'
    }
})

/* ================= EDIT ================= */
function editObat(id, nama, kategori, hargaVal) {
    editId = id
    nama_obat.value = nama
    id_kategori.value = kategori
    harga.value = hargaVal
}

/* ================= HAPUS ================= */
async function hapusObat(id) {
    if (!confirm('Yakin ingin menghapus data ini?')) return

    try {
        await fetch(`${API}/obat/${id}`, {
        method: 'DELETE'
        })
        loadObat()
    } catch (err) {
        alert('Gagal menghapus data')
    }
}

/* ================= RESET ================= */
function resetForm() {
    editId = null
    document.getElementById('formObat').reset()
}

/* ================= IMPORT OPENFDA ================= */
async function importOpenFda() {
    try {
        await fetch(`${API}/obat/import-openfda`, { method: 'POST' })
        alert('Import OpenFDA berhasil')
        loadObat()
    } catch (err) {
        alert('Import gagal')
    }
}

/* ================= INIT ================= */
loadKategori()
loadObat()