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
