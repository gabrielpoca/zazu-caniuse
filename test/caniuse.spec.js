const expect = require('chai').expect
const caniuse = require('../src/caniuse')

describe('caniuse', () => {
  describe('query', () => {
    it('returns five features', done => {
      caniuse.query('blur')
        .then(features => expect(features.length).to.equal(7))
        .catch(err => console.log(err))
        .then(() => done())
    })
  })
})
