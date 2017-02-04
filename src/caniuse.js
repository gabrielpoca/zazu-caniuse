const data = require('./data')

const searchUrl = query => {
  return `http://caniuse.com/#search=${query}`
}

module.exports.query = (query) => {
  return data.query(query)
    .then(features => {
      return features.map(feature => ({
        icon: 'fa-compass',
        value: searchUrl(feature.slug),
        title: feature.title,
      }))
    })
}
