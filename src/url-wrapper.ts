import {UrlWrapper} from './async.d.ts'

export default function () : UrlWrapper {
  return {
    createObjectURL: (blobWrapper) => {
      const blob = blobWrapper.unwrap()
      return URL.createObjectURL(blob)
    }
  }
}
