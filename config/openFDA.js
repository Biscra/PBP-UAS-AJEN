const axios = require('axios')

const fda = axios.create({
    baseURL : 'https://api.fda.gov/api',
    timeout : 10000
})

module.exports = fda