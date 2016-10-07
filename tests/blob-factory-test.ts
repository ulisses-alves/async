import {expect} from 'chai'
import * as async from '../src/core'
import BlobFactory from '../src/blob-factory'

describe('BlobFactory', () => {
  let blobFactory: async.BlobFactory

  beforeEach(() => blobFactory = BlobFactory())

  describe('call', () => {
    let result: Blob

    beforeEach(() => result = blobFactory([], {type: 'type/test'}))

    it('should return a Blob', () => {
      expect(result).to.be.a('Blob')
    })
  })
})
