import { getUrlInfo } from ".."

describe("getUrlInfo", () => {
  it("should get url info from a file", async () => {
    const info = getUrlInfo("https://site.com/f/acme/articles/123/abcde.jpg")
    expect(info).toEqual({ type: "original/generic" })
  })

  it("should get url info from an original image", async () => {
    const info = getUrlInfo(
      "https://site.com/f/acme/articles/123/abcde--640x480.jpg"
    )
    expect(info).toEqual({ type: "original/image", width: 640, height: 480 })
  })

  it("should get url info from a query image", async () => {
    const info = getUrlInfo(
      "https://site.com/f/acme/articles/123/abcde--640x480.jpg?size=320x240"
    )
    expect(info).toEqual({
      type: "query/image",
      width: 320,
      height: 240,
      original: {
        type: "original/image",
        width: 640,
        height: 480,
      },
    })
  })
})
