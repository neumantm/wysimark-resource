import { generateImageQueryUrl } from ".."

describe("resize", () => {
  describe("resize urls", () => {
    it("should resize a image file url", async () => {
      const url = generateImageQueryUrl(
        `https://files.wysimark.com/f/a/b/c/image--640x480.jpg`,
        {
          width: 320,
          height: 240,
        }
      )
      expect(url).toEqual(
        `https://files.wysimark.com/f/a/b/c/image--640x480.jpg?size=320x240`
      )
    })

    it("should resize a image query url", async () => {
      const url = generateImageQueryUrl(
        `https://files.wysimark.com/f/a/b/c/image--640x480.jpg?320x240`,
        {
          width: 160,
          height: 120,
        }
      )
      expect(url).toEqual(
        `https://files.wysimark.com/f/a/b/c/image--640x480.jpg?size=160x120`
      )
    })
  })

  describe("fail", () => {
    it("should fail if resize is bigger than original", async () => {
      expect(() =>
        generateImageQueryUrl(
          `https://files.wysimark.com/f/a/b/c/image--640x480.jpg`,
          {
            width: 1024,
            height: 768,
          }
        )
      ).toThrow(/larger than original/i)
    })

    it("should fail if it's not a valid image source", async () => {
      expect(() =>
        generateImageQueryUrl(
          `https://files.wysimark.com/f/a/b/c/image--640x480.txt`,
          {
            width: 320,
            height: 240,
          }
        )
      ).toThrow(/invalid image/i)
    })
  })
})

export {}
