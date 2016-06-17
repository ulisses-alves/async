import {expect} from 'chai'
import {stub, spy} from 'sinon'
import * as async from '../src/async.d.ts'
import WorkerFactory from '../src/worker-factory'

describe('WorkerFactory', () => {
  let workerFactory: async.WorkerFactory
  let utilStub: any
  let ctorSpy: any
  const source = 'test source'

  beforeEach(() => {
    utilStub = {
      sourceCall: stub().returns(source),
      scriptUrl: stub()
    }

    ctorSpy = spy()
    workerFactory = WorkerFactory(utilStub, ctorSpy)
  })

  it('should serialize constructor', () => {
    expect(utilStub.sourceCall.calledWith(ctorSpy)).to.be.true
  })

  it('should create a script url', () => {
    expect(utilStub.scriptUrl.calledWith(source)).to.be.true
  })

  describe('call', () => {
    let result: Worker

    beforeEach(() => result = workerFactory())

    it('should return a Worker', () => {
      expect(result).to.be.a('Worker')
    })
  })
})
