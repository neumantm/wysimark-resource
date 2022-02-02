import { customAlphabet } from "nanoid"
import { FILE_DIR } from "../types"
import { getImageContentType } from "../utils"

/**
 * Generates a custom nanoid with only alphanumeric characters
 */
const customId = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 21)

/**
 * Generates an S3 key and URL for an generic uploaded file (i.e. a file that
 * is not an image)
 *
 * The subpath should not include the root `f` dir.
 */
export function generateGenericResource({
  origin, // must not end with `/`
  subpath,
  fileExt,
}: {
  origin: string // the part of the url that looks like `https://files.host.com`
  subpath: string
  fileExt: string
}) {
  if (origin.endsWith("/")) {
    throw new Error(`origin must not end with a /`)
  }
  const filename = `${customId()}.${fileExt}`
  const originalKey = `${subpath}/${filename}`
  return {
    key: `${FILE_DIR}/${subpath}/${filename}`,
    url: `${origin}/${FILE_DIR}/${originalKey}`,
  }
}

/**
 * Generate an S3 key and URL for an uploade image.
 *
 * The subpath should not include the root `f` dir.
 */
export function generateImageResource({
  origin,
  subpath,
  fileExt,
  width,
  height,
}: {
  origin: string // the part of the url that looks like `https://files.host.com/`
  subpath: string
  fileExt: string
  width: number
  height: number
}) {
  if (origin.endsWith("/")) {
    throw new Error(`origin must not end with a /`)
  }
  const contentType = getImageContentType(fileExt)
  if (contentType == null) {
    throw new Error(`The fileExt ${fileExt} is not a handled image extension`)
  }
  const originalKey = `${subpath}/${customId()}--${width}x${height}.${fileExt}`
  return {
    key: `${FILE_DIR}/${originalKey}`,
    url: `${origin}/${FILE_DIR}/${originalKey}`,
    width,
    height,
  }
}
