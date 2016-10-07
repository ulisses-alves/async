import {BlobFactory} from './core'

export default function () : BlobFactory {
  return (blobParts, options) => new Blob(blobParts, options)
}
