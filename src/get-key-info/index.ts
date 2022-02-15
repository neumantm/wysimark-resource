import {
  KeyInfo,
  FileKeyInfo,
  ImageFileKeyInfo,
  QueryKeyInfo,
  UnrecognizedQueryKeyInfo,
} from "../types"
import { FILE_DIR, QUERY_DIR } from "../types"
import { getFilenameInfo } from "../get-filename-info"
import { getSizeFromSearchParams } from ".."

/**
 * Takes an S3 key and returns information about it.
 */
export function getKeyInfo(key: string): KeyInfo {
  const [root] = key.split("/")
  switch (root) {
    case FILE_DIR:
      return getFileKeyInfo(key)
    case QUERY_DIR:
      return getQueryKeyInfo(key)
    default:
      return { type: "unrecognized", key }
  }
}

/**
 * Parse a file key that is in `FILE_DIR` directory.
 */
function getFileKeyInfo(key: string): FileKeyInfo {
  const parts = key.split("/")
  const filename = parts[parts.length - 1]
  const info = getFilenameInfo(filename)
  return { key, ...info }
}

function getImageFileKeyInfo(key: string): ImageFileKeyInfo {
  const info = getFileKeyInfo(key)
  if (info.type !== "image") {
    throw new Error(`Expected key to match an original image`)
  }
  return info
}

/**
 * Parse a file key in the `q` directory.
 *
 * NOTE: The CDN will have had to remap to the `q` directory if there is a query.
 *
 * NOTE: Assumes the key is in the `q` directory.
 */
function getQueryKeyInfo(key: string): QueryKeyInfo {
  const unhandledQuery: UnrecognizedQueryKeyInfo = {
    type: "unrecognized-query",
    key,
  }
  const [path, query] = key.split("?") as [string] | [string, string]

  /**
   * If there is no query part, return unhandled
   */
  if (query === undefined) return unhandledQuery

  const params = new URLSearchParams(query)
  const size = getSizeFromSearchParams(params)

  if (size == null) return unhandledQuery

  // /**
  //  * If there is no size param, return unhandled
  //  */
  // const params = new URLSearchParams(query)
  // const size = params.get("size")
  // if (size == null) return unhandledQuery

  // /**
  //  * If size param is not valid, return unhandled
  //  */
  // const [widthText, heightText] = size.split("x")
  // const width = parseInt(widthText)
  // const height = parseInt(heightText)
  // if (width <= 0 || height <= 0 || isNaN(width) || isNaN(height))
  //   return unhandledQuery

  /**
   * Extract originalImageInfo
   */

  const originalImageInfo = getImageFileKeyInfo(
    `${FILE_DIR}/${path.split("/").slice(1).join("/")}`
  )
  return {
    type: "image-query",
    key,
    contentType: originalImageInfo.contentType,
    width: size.width,
    height: size.height,
    originalImageInfo,
  }
}
