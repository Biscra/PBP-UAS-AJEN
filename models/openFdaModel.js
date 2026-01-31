const axios = require('axios')

exports.fetchOpenFda = async () => {
  const response = await axios.get(
    'https://api.fda.gov/drug/label.json?limit=5'
  )
  return response.data.results
}