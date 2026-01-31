const axios = require('axios')
const medicineModel = require('../models/medicineModel')

const importOpenFda = async (req, res) => {
    try {
        const response = await axios.get(
            'https://api.fda.gov/drug/label.json?limit=5'
        )

        for (const item of response.data.results) {
            await medicineModel.addMedicine({
                nama_obat: item.openfda?.brand_name?.[0] || 'Unknown',
                kategori: 'OpenFDA',
                harga: 0
            })
        }

        res.json({ msg: "Import OpenFDA Success" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { importOpenFda }