/**
 * Takes an existing image URL and return a new URL o fthe image resized to
 * the width/height in the arguments.
 */

import { getFilenameInfo } from "../get-filename-info"
import { extractFilename, getSortedQueryString } from "../utils"

/**
 * Takes an existing URL and generates a new URL reflecting that the image
 * size was changed.
 */
export function generateImageQueryUrl(
  url: string,
  { width, height }: { width: number; height: number }
) {
  const urlInfo = new URL(url)
  const filename = extractFilename(urlInfo.pathname)
  const filenameInfo = getFilenameInfo(filename)
  if (filenameInfo.type !== "original/image") {
    throw new Error(`Invalid image url ${JSON.stringify(url)}`)
  }
  if (width > filenameInfo.width || height > filenameInfo.height) {
    throw new Error(
      `Resize image ${width}x${height} is larger than original ${filenameInfo.width}x${filenameInfo.height}`
    )
  }
  const querystring = getSortedQueryString(
    new URLSearchParams({ size: `${width}x${height}` })
  )
  return `${urlInfo.origin}${urlInfo.pathname}?${querystring}`
}
