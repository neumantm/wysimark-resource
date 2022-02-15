/**
 * URL Info
 */

export type GenericURLInfo = {
  type: "generic"
  url: string
}

export type OriginalImageURLInfo = {
  type: "image"
  url: string
  width: number
  height: number
}

export type ImageQueryURLInfo = {
  type: "image-query"
  url: string
  width: number
  height: number
  original: OriginalImageURLInfo
}

export type URLInfo = GenericURLInfo | OriginalImageURLInfo | ImageQueryURLInfo
