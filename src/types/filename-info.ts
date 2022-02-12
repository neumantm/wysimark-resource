import { ImageContentType } from "./content-type"

/**
 * Filename Info
 */

export type GenericFilenameInfo = {
  type: "original/generic"
}

export type ImageFilenameInfo = {
  type: "original/image"
  contentType: ImageContentType
  width: number
  height: number
}

export type FilenameInfo = GenericFilenameInfo | ImageFilenameInfo
