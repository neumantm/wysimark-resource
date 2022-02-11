import * as r from ".."
import { getMockRequestFromURL } from "../utils"

function $(regexpString: string) {
  return new RegExp(regexpString.replace(`$1`, `[a-z0-9]+`))
}

describe("portive-resource", () => {
  it("should handle generic resource through all steps", async () => {
    /**
     * generate resource
     */
    const generateInfo = r.generateGenericResource({
      origin: "https://files.portive.com",
      subpath: "temp/a/b/c",
      fileExt: "txt",
    })
    expect(generateInfo).toEqual({
      type: "generic",
      key: expect.stringMatching($(`f/temp/a/b/c/$1.txt`)),
      url: expect.stringMatching(
        $(`https://files.portive.com/f/temp/a/b/c/$1.txt`)
      ),
    })
    const generatedKey = generateInfo.key
    const generatedUrl = generateInfo.url

    /**
     * remap viewer request
     */
    const requestInfo = r.remapCloudFrontRequest({
      uri: `/${generateInfo.key}`,
      querystring: "",
    })
    expect(requestInfo).toEqual({
      uri: expect.stringMatching($(`/${generatedKey}`)),
      querystring: "",
    })

    /**
     * Get Key from URI
     */
    const requestKey = r.extractKeyFromURI(requestInfo.uri)
    expect(requestKey).toEqual(generatedKey)

    /**
     * Get Key Info
     */
    const keyInfo = r.getKeyInfo(requestKey)
    expect(keyInfo).toEqual({ type: "original/generic", key: generatedKey })

    /**
     * Process Image should fail
     */
    expect(() =>
      r.generateImageQueryUrl(generatedUrl, { width: 640, height: 480 })
    ).toThrow(/invalid image url/i)
  })

  it("should handle image resource through all steps", async () => {
    /**
     * generate resource
     */
    const generateInfo = r.generateImageResource({
      origin: "https://files.portive.com",
      subpath: "temp/a/b/c",
      fileExt: "jpeg",
      width: 1024,
      height: 768,
    })
    expect(generateInfo).toEqual({
      type: "image",
      key: expect.stringMatching($(`f/temp/a/b/c/$1--1024x768.jpeg`)),
      url: expect.stringMatching(
        $(`https://files.portive.com/f/temp/a/b/c/$1--1024x768.jpeg`)
      ),
      width: 1024,
      height: 768,
    })
    const generatedKey = generateInfo.key
    const generatedUrl = generateInfo.url

    /**
     * remap viewer request
     */
    const remappedRequestInfo = r.remapCloudFrontRequest({
      uri: `/${generateInfo.key}`,
      querystring: "",
    })
    expect(remappedRequestInfo).toEqual({
      uri: expect.stringMatching($(`/${generatedKey}`)),
      querystring: "",
    })

    /**
     * Get Key from URI
     */
    const requestKey = r.extractKeyFromURI(remappedRequestInfo.uri)
    expect(requestKey).toEqual(generatedKey)

    /**
     * Get Key Info
     */
    const keyInfo = r.getKeyInfo(requestKey)
    expect(keyInfo).toEqual({
      type: "original/image",
      key: generatedKey,
      contentType: "image/jpeg",
      width: 1024,
      height: 768,
    })
  })

  it("should handle resized image through all steps", async () => {
    /**
     * generate resource
     */
    const generateInfo = r.generateImageResource({
      origin: "https://files.portive.com",
      subpath: "temp/a/b/c",
      fileExt: "jpeg",
      width: 1024,
      height: 768,
    })
    const originalUrl = generateInfo.url
    const originalKey = generateInfo.key

    /**
     * Process Image
     */
    const resizedImageUrl = r.generateImageQueryUrl(originalUrl, {
      width: 320,
      height: 240,
    })
    expect(resizedImageUrl).toEqual(`${originalUrl}?size=320x240`)

    /**
     * Check incoming request
     */
    const request = getMockRequestFromURL(resizedImageUrl)
    expect(request).toEqual({
      uri: `/${originalKey}`,
      querystring: "size=320x240",
    })

    /**
     * Remap incoming request
     */
    const remappedRequest = r.remapCloudFrontRequest(request)
    const expectedRemappedKey = `fq/${originalKey.slice(2)}?size=320x240`
    expect(remappedRequest).toEqual({
      uri: `/fq/${originalKey.slice(2)}${encodeURIComponent(`?size=320x240`)}`,
      querystring: "",
    })

    const remappedKey = r.extractKeyFromURI(remappedRequest.uri)
    expect(remappedKey).toEqual(expectedRemappedKey)

    const resizedKeyInfo = r.getKeyInfo(remappedKey)
    expect(resizedKeyInfo).toEqual({
      type: "query/image",
      key: remappedKey,
      contentType: "image/jpeg",
      width: 320,
      height: 240,
      originalImageInfo: {
        key: originalKey,
        type: "original/image",
        contentType: "image/jpeg",
        width: 1024,
        height: 768,
      },
    })
  })
})
