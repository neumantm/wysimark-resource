import { getUrlInfo } from ".."

describe("getUrlInfo", () => {
  it("should get url info from a file", async () => {
    const url = "https://site.com/f/acme/articles/123/abcde.jpg"
    const info = getUrlInfo(url)
    expect(info).toEqual({ type: "original/generic", url })
  })

  it("should get url info from an original image", async () => {
    const url = "https://site.com/f/acme/articles/123/abcde--640x480.jpg"
    const info = getUrlInfo(url)
    expect(info).toEqual({
      type: "original/image",
      url,
      width: 640,
      height: 480,
    })
  })

  it("should get url info from a query image", async () => {
    const url =
      "https://site.com/f/acme/articles/123/abcde--640x480.jpg?size=320x240"
    const info = getUrlInfo(url)
    expect(info).toEqual({
      type: "query/image",
      url,
      width: 320,
      height: 240,
      original: {
        type: "original/image",
        url: "https://site.com/f/acme/articles/123/abcde--640x480.jpg",
        width: 640,
        height: 480,
      },
    })
  })
})
