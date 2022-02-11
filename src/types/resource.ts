export type GenericResource = {
  type: "generic"
  key: string
  url: string
}

export type ImageResource = {
  type: "image"
  key: string
  url: string
  width: number
  height: number
}

export type Resource = GenericResource | ImageResource
