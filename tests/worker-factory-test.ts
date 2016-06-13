import {expect} from 'chai'
import {stub} from 'sinon'
import * as async from '../src/async.d.ts'
import WorkerFactory from '../src/worker-factory'

describe('WorkerFactory', () => {
  let workerFactory: async.WorkerFactory = null
  let utilStub:any = null

  beforeEach(() => {
    utilStub = {}
    stub(utilStub, 'source')
  })
})
