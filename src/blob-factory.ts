import {BlobFactory, BlobWrapper} from './async.d.ts'

let blobFactory: BlobFactory = (blobParts, options) => {
  const blob = new Blob(blobParts, options)

  return {
    unwrap: () => blob
  }
}

export default function () : BlobFactory {
  return blobFactory
}
