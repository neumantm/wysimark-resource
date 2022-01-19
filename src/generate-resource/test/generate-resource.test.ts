import { generateGenericResource, generateImageResource } from ".."

describe("generate", () => {
  describe("generate generic", () => {
    it("should generate a generic file", async () => {
      const data = generateGenericResource({
        origin: "https://files.host.com",
        subpath: "mezine/articles/123",
        fileExt: "txt",
      })
      expect(data).toEqual({
        key: expect.stringMatching(
          /^f[/]mezine[/]articles[/]123[/]([a-z0-9]+)[.]txt$/
        ),
        url: expect.stringMatching(
          /^https[:][/][/]files[.]host[.]com[/]f[/]mezine[/]articles[/]123[/]([a-z0-9]+)[.]txt$/
        ),
      })
    })
  })

  describe("generate image", () => {
    it("should generate an image file", async () => {
      const data = generateImageResource({
        origin: "https://files.host.com",
        subpath: "mezine/articles/123",
        fileExt: "jpg",
        width: 640,
        height: 480,
      })
      expect(data).toEqual({
        key: expect.stringMatching(
          /^f[/]mezine[/]articles[/]123[/]([a-z0-9]+)[-][-]([0-9]+)x([0-9]+)[.]jpg$/
        ),
        url: expect.stringMatching(
          /^https[:][/][/]files[.]host[.]com[/]f[/]mezine[/]articles[/]123[/]([a-z0-9]+)[-][-]([0-9]+)x([0-9]+)[.]jpg$/
        ),
        width: 640,
        height: 480,
      })
    })
  })
})
