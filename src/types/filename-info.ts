import { ImageContentType } from "./content-type"

/**
 * Filename Info
 */

export type GenericFilenameInfo = {
  type: "generic"
}

export type ImageFilenameInfo = {
  type: "image"
  contentType: ImageContentType
  width: number
  height: number
}

export type FilenameInfo = GenericFilenameInfo | ImageFilenameInfo
