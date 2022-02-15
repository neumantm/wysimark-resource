import { getImageContentType } from "../utils"
import { ImageFilenameInfo, FilenameInfo } from "../types"

/**
 * Takes the `filename` portion of url or key and returns:
 *
 * 1. whether or not it is an image or generic url
 * 2. if it is an image, its width/height
 */

const IMAGE_FILENAME_REGEXP = new RegExp(
  `([a-z0-9]+)--?([0-9]+)x([0-9]+)[.](jpg|jpeg|gif|png)$`
)

/**
 * Internal function returns the filename info for the given filename if it
 * is a valid image filename. If it is not, returns `null`.
 */
function getImageFilenameInfo(filename: string): ImageFilenameInfo | null {
  const match = filename.match(IMAGE_FILENAME_REGEXP)
  if (match === null) return null
  const [, , $width, $height, fileext] = match
  const imageContentType = getImageContentType(fileext)
  if (imageContentType === undefined) return null
  const width = parseInt($width)
  const height = parseInt($height)
  if (width <= 0 || height <= 0) return null
  return {
    type: "image",
    contentType: imageContentType,
    width,
    height,
  }
}

/**
 * Takes a filename and returns either `GenericFilenameInfo` or if it is a valid
 * image returns an `ImageFilenameInfo`
 */
export function getFilenameInfo(filename: string): FilenameInfo {
  const imageInfo = getImageFilenameInfo(filename)
  if (imageInfo) return imageInfo
  return {
    type: "generic",
  }
}
