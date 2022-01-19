import {
  CloudFrontEvent,
  CloudFrontRequest,
  FILE_DIR,
  QUERY_DIR,
} from "../types"
import { getSortedQueryString } from "../utils"

/**
 * Takes a CloudFront Event and extracts the Request portion of it
 */
export function extractRequestFromEvent<T extends CloudFrontRequest>(
  e: CloudFrontEvent<T>
) {
  return e.Records[0].cf.request
}

/**
 * Takes a Request event which may include a `querystring` and merges the
 * `querystring` into the `uri` be escaping it and additing it to the end.
 * The `querystring` is then set to an empty string before being returned.
 *
 * NOTE: The original `CFRequest` object is not modified. If a change is made,
 * we create a shallow copy first. If there is no change, then we return the
 * original object. Kind of like `immutable`.
 */
export function remapCloudFrontRequest(
  request: CloudFrontRequest
): CloudFrontRequest {
  if (!request.uri.startsWith("/")) {
    throw new Error(
      `Expected request.uri to start with a "/" but is ${JSON.stringify(
        request.uri
      )}`
    )
  }
  /**
   * If `uri` is outside the `f` directory or `querystring` is "", don't remap.
   */
  if (!request.uri.startsWith(`/${FILE_DIR}/`) || request.querystring === "") {
    return request
  }

  /**
   * Map querystring requests to the QUERY_DIR. We keep the QUERY_DIR
   * separate so that we can discard all its contents if we wish as they
   * will be automatically generated anyways.
   */
  const nextUri = request.uri.replace(`/${FILE_DIR}/`, `/${QUERY_DIR}/`)

  /**
   * Convert to escaped query string.
   */
  const querystring = getSortedQueryString(
    new URLSearchParams(request.querystring)
  )
  const nextRequest: CloudFrontRequest = {
    ...request,
    uri: `${nextUri}${encodeURIComponent(`?${querystring}`)}`,
    querystring: ``,
  }
  return nextRequest
}
