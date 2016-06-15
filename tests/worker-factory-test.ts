import {expect} from 'chai'
import {stub, spy} from 'sinon'
import * as async from '../src/async.d.ts'
import WorkerFactory from '../src/worker-factory'

describe('WorkerFactory', () => {
  let workerFactory: async.WorkerFactory
  let utilStub: any
  let metaSpy: any

  beforeEach(() => {
    utilStub = {
      source: stub(),
      scriptUrl: stub()
    }

    metaSpy = spy()
    workerFactory = WorkerFactory(utilStub, metaSpy)
  })
})
