/**
 * This method returns information about the resource at this url including
 * whether it is a resizable image.
 */

import { getFilenameInfo, getSizeFromSearchParams } from ".."
import { URLInfo } from "../types"

/**
 * Used by the Wysimark editor component to parse a URL.
 *
 * When this method is called, we assume that the passed in `url` has already
 * been identified as being in the rescource path like:
 *
 * `https://files.wysimark.com/f/articles/123/riweuriouewiroeuwo--640x480.jpg`
 *
 * IMPORTANT!
 *
 * The `url` should have been determined to be in the origin/path of an
 * actual resource first. This will then determine what kind of resource
 * based on its filename and query params.
 */
export function getUrlInfo(urlInResourcePath: string): URLInfo {
  const url = new URL(urlInResourcePath)
  const filename = url.pathname.split("/").pop()
  if (filename == null) throw new Error(`Expected a filename`)
  const filenameInfo = getFilenameInfo(filename)
  if (filenameInfo.type === "generic")
    return {
      type: "generic",
      url: urlInResourcePath,
    }
  const querySize = getSizeFromSearchParams(url.searchParams)
  if (querySize == null) {
    return {
      type: "image",
      url: urlInResourcePath,
      width: filenameInfo.width,
      height: filenameInfo.height,
    }
  }
  return {
    type: "image-query",
    url: urlInResourcePath,
    width: querySize.width,
    height: querySize.height,
    original: {
      type: "image",
      url: `${url.origin}${url.pathname}`,
      width: filenameInfo.width,
      height: filenameInfo.height,
    },
  }
}
