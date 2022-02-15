import { ImageContentType } from "."

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
  type: "image"
  key: string
  contentType: ImageContentType
  width: number
  height: number
}

export type GenericFileKeyInfo = {
  type: "generic"
  key: string
}

export type FileKeyInfo = ImageFileKeyInfo | GenericFileKeyInfo

/**
 * File Query Info
 */
export type ImageQueryKeyInfo = {
  type: "image-query"
  contentType: ImageContentType
  key: string
  width: number
  height: number
  originalImageInfo: ImageFileKeyInfo
}

export type UnrecognizedQueryKeyInfo = {
  type: "unrecognized-query"
  key: string
}

export type QueryKeyInfo = ImageQueryKeyInfo | UnrecognizedQueryKeyInfo

export type KeyInfo = UnrecognizedKeyInfo | FileKeyInfo | QueryKeyInfo

export type KeyType = KeyInfo["type"]
