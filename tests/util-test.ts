import {expect} from 'chai'
import {stub} from 'sinon'
import util from '../src/util'

describe('.source(fn) serializes function', () => {
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

