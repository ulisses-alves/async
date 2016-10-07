import {expect} from 'chai'
import {stub, spy} from 'sinon'
import * as async from '../src/core'
import Util from '../src/util'

describe('Util', () => {
  let util: any
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

  describe('sourceCall(fn)', () => {
    let fn: any
    const sourceStr = 'source content'

    beforeEach(() => {
      fn = spy()
      stub(util, 'source', () => sourceStr)
    })

    it('should serialize function call', () => {
      const sourceCall = util.sourceCall(fn)
      expect(util.source.calledWith(fn)).to.be.true
      expect(util.source.calledOnce).to.be.true
      expect(sourceCall).to.equal(`${sourceStr}.call(this)`)
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
