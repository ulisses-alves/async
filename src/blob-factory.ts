import {BlobFactory} from './async.d.ts'

export default function () : BlobFactory {
  return (blobParts, options) => new Blob(blobParts, options)
}
