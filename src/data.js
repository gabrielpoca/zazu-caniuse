const Fuse = require('fuse.js')
const featuresData = require('caniuse-db/data.json').data

const browsersInTitle = [
  'ie',
  'edge',
  'firefox',
  'chrome',
  'safari'
]

const browserToKey = {
  ie: 'IE',
  edge: 'EDGE',
  firefox: 'FF',
  chrome: 'CH',
  safari: 'S'
}

const firstBrowserVersionForFeature = (feature, browser) => {
  return Object.keys(feature.stats[browser]).filter((version) => {
    return feature.stats[browser][version].indexOf('y') !== -1
  })[0]
}

const titleStatsForFeature = (feature) => {
  return Object.keys(feature.stats)
    .filter(browser => {
      return browsersInTitle.indexOf(browser) !== -1
    })
    .reduce((list, browser) => {
      const firstVersion = firstBrowserVersionForFeature(feature, browser)

      if (firstVersion) {
        list.push(`${browserToKey[browser]}:${firstVersion}+`)
      }

      return list
    }, [])
    .join(', ')
}

const features = Object.keys(featuresData)
  .reduce((memo, featureSlug) => {
    const feature = featuresData[featureSlug]

    const titleStats = titleStatsForFeature(feature)

    if (titleStats !== '') {
      feature.title += ` [${titleStats}]`
    }

    feature.slug = featureSlug

    memo.push(feature)
    return memo
  }, [])

const fuse = new Fuse(features, {
  shouldSort: true,
  tokenize: true,
  threshold: 0.5,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 2,
  keys: [
    'title',
    'description'
  ]
})

module.exports.query = query => {
  return new Promise((resolve, reject) => {
    return resolve(fuse.search(query))
  })
}
