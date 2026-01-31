const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/userRoute')
const medicineRoute = require('./routes/medicineRoute')
const stokinRoute = require('./routes/stokinRoute')
const stokoutRoute = require('./routes/stokoutRoute')
const transactionRoute = require('./routes/transactionRoute')
const categoryRoute = require('./routes/categoryRoute')
const openFdaRoute = require('./routes/openFdaRoute') 

app.use('/api/auth', authRoute)         
app.use('/api/users', userRoute)       
app.use('/api/obat', medicineRoute)  
app.use('/api/stok_masuk', stokinRoute)     
app.use('/api/stok_keluar', stokoutRoute)    
app.use('/api/transaksi', transactionRoute) 
app.use('/api/kategori', categoryRoute) 
app.use('/api/openfda', openFdaRoute) 

app.get('/', (req, res) => {
    res.json({ message: 'API Toko Obat berjalan' })
})
app.use((req, res) => {
    res.status(404).json({
        message: 'Endpoint Not Found'
    })
})
const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
