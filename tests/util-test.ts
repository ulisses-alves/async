import {expect} from 'chai'
import {stub} from 'sinon'
import * as async from '../src/async.d.ts'
import Util from '../src/util'

describe('Util', () => {
  let util: async.Util
  let blobFactoryStub: any
  let blobStub: any
  let urlStub: any

  beforeEach(() => {
    blobStub = {unwrap: stub().returns(new Blob())}
    blobFactoryStub = stub().returns(blobStub)
    urlStub = {createObjectURL: stub()}
    util = Util(blobFactoryStub, urlStub)
  })

  describe('source(fn)', () => {
    let fn: any
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

  describe('scriptUrl(src)', () => {
    const src = 'src content'
    const expectedUrl = 'some url'

    beforeEach(() => urlStub.createObjectURL.returns(expectedUrl))

    it('should create create a script blob', () => {
      const blob = util.scriptUrl(src)
      expect(blobFactoryStub.calledWith([src], {type: 'text/javascript'}))
        .to.be.true
    })

    it('should create and return object url', () => {
      const url = util.scriptUrl(src)
      expect(urlStub.createObjectURL.calledWith(blobStub)).to.be.true
      expect(url).to.equal(expectedUrl)
    })
  })
})
