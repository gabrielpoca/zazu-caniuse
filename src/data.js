const featuresData = require('caniuse-db/data.json').data

const features = Object.keys(featuresData)
  .reduce((memo, feature) => {
    featuresData[feature].slug = feature
    memo.push(featuresData[feature])
    return memo
  }, [])

module.exports.query = query => {
  return new Promise((resolve, reject) => {
    const match = features.filter(feature => {
      return (feature.title.indexOf(query)) !== -1 ||
        (feature.description.indexOf(query) !== -1)
    })

    return resolve(match)
  })
}
