import {BlobFactory} from './async.d.ts'

let blobFactory: BlobFactory = (blobParts, options) => {
  return new Blob(blobParts, options)
}

export default function () : BlobFactory {
  return blobFactory
}
