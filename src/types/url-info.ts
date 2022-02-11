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
