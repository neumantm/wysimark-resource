import { extractFileExt } from ".."

describe("generate", () => {
  describe("extractFileExt", () => {
    it("should extract file extensions", async () => {
      const ext = extractFileExt("https://files.host.com/a/b/c/d/hello.txt")
      expect(ext).toEqual("txt")
    })
  })
})
