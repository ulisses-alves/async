import {expect} from 'chai'
import {stub} from 'sinon'
import Util from '../src/util'

describe('Util', () => {
  let util: any = null

  beforeEach(() => util = Util())

  describe('source(fn) serializes function', () => {
    let fn: any = null
    const fnStr = 'fn content'

    beforeEach(() => {
      fn = {}
      stub(fn, 'toString', () => fnStr)
    })

    it('should wrap function serialization', () => {
      const source = util.source(fn)
      expect(fn.toString.calledOnce).to.be.true
      expect(source).to.equal(`(${fnStr})`)
    })
  })
})
