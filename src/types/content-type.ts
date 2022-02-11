export type ImageContentType = "image/jpeg" | "image/gif" | "image/png"

export const CONTENT_TYPE_LOOKUP = new Map([
  ["jpg", "image/jpeg"],
  ["jpeg", "image/jpeg"],
  ["gif", "image/gif"],
  ["png", "image/png"],
] as [string, ImageContentType][])
