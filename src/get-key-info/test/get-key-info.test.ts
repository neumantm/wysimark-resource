import { getKeyInfo } from ".."

describe("parseKey", () => {
  describe("unrecognized key", () => {
    it("should identify an unrecognized key", async () => {
      const info = getKeyInfo("unknown-prefix/a/b/c/alphabet.txt")
      expect(info).toEqual({
        type: "unrecognized",
        key: "unknown-prefix/a/b/c/alphabet.txt",
      })
    })
  })

  describe("original other", () => {
    it("should identify an original file", async () => {
      const info = getKeyInfo("f/a/b/c/alphabet.txt")
      expect(info).toEqual({
        type: "generic",
        key: "f/a/b/c/alphabet.txt",
      })
    })
  })

  describe("original image", () => {
    it("should identify an original image file", async () => {
      const info = getKeyInfo("f/a/b/c/chickens--640x480.png")
      expect(info).toEqual({
        type: "image",
        key: "f/a/b/c/chickens--640x480.png",
        contentType: "image/png",
        width: 640,
        height: 480,
      })
    })

    it("should identify an invalid original image file as an other file", async () => {
      const info = getKeyInfo("f/a/b/c/chickens--0x0.png")
      expect(info).toEqual({
        type: "generic",
        key: "f/a/b/c/chickens--0x0.png",
      })
    })
  })

  describe("query image", () => {
    it("should identify a query image", async () => {
      const info = getKeyInfo("fq/a/b/c/d--640x480.jpg?size=320x240")
      expect(info).toEqual({
        type: "image-query",
        key: "fq/a/b/c/d--640x480.jpg?size=320x240",
        contentType: "image/jpeg",
        width: 320,
        height: 240,
        originalImageInfo: {
          type: "image",
          key: "f/a/b/c/d--640x480.jpg",
          contentType: "image/jpeg",
          width: 640,
          height: 480,
        },
      })
    })
  })

  describe("query unrecognized", () => {
    it("should return unrecognized if there are no query params", async () => {
      const info = getKeyInfo("fq/a/b/c/d--640x480.jpg")
      expect(info).toEqual({
        type: "unrecognized-query",
        key: "fq/a/b/c/d--640x480.jpg",
      })
    })

    it("should return unrecognized if there is no size param", async () => {
      const info = getKeyInfo("fq/a/b/c/d--640x480.jpg?dimensions=320x480")
      expect(info).toEqual({
        type: "unrecognized-query",
        key: "fq/a/b/c/d--640x480.jpg?dimensions=320x480",
      })
    })

    it("should return unrecognized if width <= 0", async () => {
      const info = getKeyInfo("fq/a/b/c/d--640x480.jpg?size=0x480")
      expect(info).toEqual({
        type: "unrecognized-query",
        key: "fq/a/b/c/d--640x480.jpg?size=0x480",
      })
    })

    it("should return unrecognized if height <= 0", async () => {
      const info = getKeyInfo("fq/a/b/c/d--640x480.jpg?size=320x0")
      expect(info).toEqual({
        type: "unrecognized-query",
        key: "fq/a/b/c/d--640x480.jpg?size=320x0",
      })
    })

    it("should return unrecognized if width is NaN", async () => {
      const info = getKeyInfo("fq/a/b/c/d--640x480.jpg?size=onex480")
      expect(info).toEqual({
        type: "unrecognized-query",
        key: "fq/a/b/c/d--640x480.jpg?size=onex480",
      })
    })

    it("should return unrecognized if height is NaN", async () => {
      const info = getKeyInfo("fq/a/b/c/d--640x480.jpg?size=320xone")
      expect(info).toEqual({
        type: "unrecognized-query",
        key: "fq/a/b/c/d--640x480.jpg?size=320xone",
      })
    })

    it("should return unrecognized if only width provided", async () => {
      const info = getKeyInfo("fq/a/b/c/d--640x480.jpg?size=320")
      expect(info).toEqual({
        type: "unrecognized-query",
        key: "fq/a/b/c/d--640x480.jpg?size=320",
      })
    })
  })
})
