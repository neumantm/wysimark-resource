/**
 * Upload File Info
 *
 * The shape of information passed from the browser to the upload API.
 */

export type UploadGenericFileInfo = {
  type: "generic"
  filename: string
  bytes: number
}

export type UploadImageFileInfo = {
  type: "image"
  filename: string
  bytes: number
  width: number
  height: number
}

export type UploadFileInfo = UploadGenericFileInfo | UploadImageFileInfo
