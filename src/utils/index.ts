import {
  CloudFrontRequest,
  CONTENT_TYPE_LOOKUP,
  ImageContentType,
} from "../types"

/**
 * Takes a url, key, path or file name and returns the file extension.
 */
export function extractFileExt(uri: string) {
  return uri.split("?").shift()!.split(".").pop()!
}

/**
 * Takes a url, key or path and returns the filename.
 */
export function extractFilename(uri: string) {
  return uri.split("?").shift()!.split("/").pop()!
}

/**
 * Takes a URI (can be a URL, filename or just an extension) and returns the
 * content-type if this is an image. If it's not an image, returns undefined.
 */
export function getImageContentType(uri: string): ImageContentType | undefined {
  const fileext = extractFileExt(uri)
  return CONTENT_TYPE_LOOKUP.get(fileext)
}

/**
 * Takes a URLSearchParams and returns a querystring that will always be
 * returned in the same order regardless of the order of the inputs of the
 * search params.
 *
 * This helps make the querystring consistent regardless of the way the
 * URLSearchParams were constructed.
 */
export function getSortedQueryString(params: URLSearchParams): string {
  const nextParams = new URLSearchParams(params)
  /**
   * Sorts params in place
   */
  nextParams.sort()
  return nextParams.toString()
}

/**
 * Takes a CloudFront style `uri` (e.g. in the CloudFront Request) and returns
 * the S3 key.
 *
 * The `uri` component will potentially have encoded characters like `?` and
 * `=` that have to be decoded.
 */
export function extractKeyFromURI(uri: string) {
  if (!uri.startsWith("/")) {
    throw new Error(
      `Expected uri to start with "/" but is ${JSON.stringify(uri)}`
    )
  }
  return decodeURIComponent(uri).slice(1)
}

/**
 * Takes a URL and returns the `uri` and `querystring` as it would appear in
 * a CloudFront Request.
 *
 * Useful for testing.
 */
export function getRequestFromURL(urlString: string): CloudFrontRequest {
  const url = new URL(urlString)
  return {
    uri: url.pathname,
    querystring: url.searchParams.toString(),
  }
}
