export type ImageContentType = "image/jpeg" | "image/gif" | "image/png"

/**
 * Unrecognized Key Info
 */
export type UnrecognizedKeyInfo = {
  type: "unrecognized"
  key: string
}

/**
 * File Key Info
 */
export type ImageFileKeyInfo = {
  type: "original/image"
  key: string
  contentType: ImageContentType
  width: number
  height: number
}

export type GenericFileKeyInfo = {
  type: "original/generic"
  key: string
}

export type FileKeyInfo = ImageFileKeyInfo | GenericFileKeyInfo

/**
 * File Query Info
 */
export type ImageQueryKeyInfo = {
  type: "query/image"
  contentType: ImageContentType
  key: string
  width: number
  height: number
  originalImageInfo: ImageFileKeyInfo
}

export type UnrecognizedQueryKeyInfo = {
  type: "query/unrecognized"
  key: string
}

export type QueryKeyInfo = ImageQueryKeyInfo | UnrecognizedQueryKeyInfo

export type KeyInfo = UnrecognizedKeyInfo | FileKeyInfo | QueryKeyInfo

export type KeyType = KeyInfo["type"]

/**
 * Filename Info
 */

export type ImageFilenameInfo = {
  type: "original/image"
  contentType: ImageContentType
  width: number
  height: number
}

export type GenericFilenameInfo = {
  type: "original/generic"
}

export type FilenameInfo = ImageFilenameInfo | GenericFilenameInfo

/**
 * URL Info
 */

export type GenericURLInfo = {
  type: "original/generic"
  url: string
}

export type OriginalImageURLInfo = {
  type: "original/image"
  url: string
  width: number
  height: number
}

export type ImageQueryURLInfo = {
  type: "query/image"
  url: string
  width: number
  height: number
  original: OriginalImageURLInfo
}

export type URLInfo = GenericURLInfo | OriginalImageURLInfo | ImageQueryURLInfo

export const CONTENT_TYPE_LOOKUP = new Map([
  ["jpg", "image/jpeg"],
  ["jpeg", "image/jpeg"],
  ["gif", "image/gif"],
  ["png", "image/png"],
] as [string, ImageContentType][])

export const FILE_DIR = "f"
export const QUERY_DIR = "fq"

export interface CloudFrontRequest {
  /**
   * A CloudFront `uri` starts with a `/` and doesn't include the origin.
   * It looks like `/f/sample/text/alphabet.txt`
   */
  uri: string
  /**
   * A CloudFront `querystring` does not include the `?` and should be parsed
   * using URLSearchParams
   */
  querystring: string
}

export interface CloudFrontEvent<T extends CloudFrontRequest> {
  Records: Array<{ cf: { request: T } }>
}
