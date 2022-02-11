export interface CloudFrontRequest {
  /**
   * A CloudFront `uri` starts with a `/` and doesn't include the origin.
   * It looks like `/f/sample/text/alphabet.txt`
   */
  uri: string
  /**
   * A CloudFront `querystring` does not include the `?` and should be parsed
   * using URLSearchParams
   */
  querystring: string
}

export interface CloudFrontEvent<T extends CloudFrontRequest> {
  Records: Array<{ cf: { request: T } }>
}
