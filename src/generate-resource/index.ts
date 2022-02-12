import { customAlphabet } from "nanoid"
import {
  FILE_DIR,
  UploadFileInfo,
  UploadGenericFileInfo,
  UploadImageFileInfo,
  ImageResource,
  GenericResource,
  Resource,
} from "../types"
import { getImageContentType } from "../utils"

/**
 * Generates a custom nanoid with only alphanumeric characters
 */
const customId = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 21)

function getFileExt(path: string): string {
  const fileExt = path.split(".").pop()
  if (fileExt === undefined) {
    throw new Error(`fileExt cannot be undefined`)
  }
  return fileExt
}

/**
 * Generates an S3 key and URL for an generic uploaded file (i.e. a file that
 * is not an image)
 *
 * The subpath should not include the root `f` dir.
 */
export function generateGenericResource({
  origin, // must not end with `/`
  subpath,
  fileInfo,
}: {
  origin: string // the part of the url that looks like `https://files.host.com`
  subpath: string
  fileInfo: UploadGenericFileInfo
}): GenericResource {
  if (origin.endsWith("/")) {
    throw new Error(`origin must not end with a /`)
  }
  const fileExt = getFileExt(fileInfo.filename)
  const filename = `${customId()}.${fileExt}`
  const originalKey = `${subpath}/${filename}`
  return {
    type: "generic",
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
  fileInfo,
}: // fileExt,
// width,
// height,
{
  origin: string // the part of the url that looks like `https://files.host.com/`
  subpath: string
  fileInfo: UploadImageFileInfo
  // fileExt: string
  // width: number
  // height: number
}): ImageResource {
  if (origin.endsWith("/")) {
    throw new Error(`origin must not end with a /`)
  }
  const fileExt = getFileExt(fileInfo.filename)
  const contentType = getImageContentType(fileExt)
  if (contentType == null) {
    throw new Error(`The fileExt ${fileExt} is not a handled image extension`)
  }
  const originalKey = `${subpath}/${customId()}--${fileInfo.width}x${
    fileInfo.height
  }.${fileExt}`
  return {
    type: "image",
    key: `${FILE_DIR}/${originalKey}`,
    url: `${origin}/${FILE_DIR}/${originalKey}`,
    width: fileInfo.width,
    height: fileInfo.height,
  }
}

export function generateResource({
  origin,
  subpath,
  fileInfo,
}: {
  origin: string
  subpath: string
  fileInfo: UploadFileInfo
}): Resource {
  const fileExt = fileInfo.filename.split(".").pop()
  if (typeof fileExt !== "string") {
    throw new Error(`Expected fileext to be a string`)
  }
  return fileInfo.type === "generic"
    ? generateGenericResource({ origin, subpath, fileInfo })
    : generateImageResource({
        origin,
        subpath,
        fileInfo,
      })
}
