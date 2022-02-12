import {
  generateResource,
  generateGenericResource,
  generateImageResource,
} from ".."

describe("generate resource", () => {
  it("should generate a generic file", async () => {
    const data = generateGenericResource({
      origin: "https://files.host.com",
      subpath: "mezine/articles/123",
      fileInfo: {
        type: "generic",
        filename: "someimage.txt",
        bytes: 1024,
      },
    })
    expect(data).toEqual({
      type: "generic",
      key: expect.stringMatching(
        /^f[/]mezine[/]articles[/]123[/]([a-z0-9]+)[.]txt$/
      ),
      url: expect.stringMatching(
        /^https[:][/][/]files[.]host[.]com[/]f[/]mezine[/]articles[/]123[/]([a-z0-9]+)[.]txt$/
      ),
    })
  })

  it("should generate an image file", async () => {
    const data = generateImageResource({
      origin: "https://files.host.com",
      subpath: "mezine/articles/123",
      fileInfo: {
        type: "image",
        filename: "someimage.jpg",
        bytes: 1024,
        width: 640,
        height: 480,
      },
    })
    expect(data).toEqual({
      type: "image",
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

  it("should generate a generic file from a fileInfo", async () => {
    const data = generateResource({
      origin: "https://files.host.com",
      subpath: "mezine/articles/123",
      fileInfo: {
        type: "generic",
        filename: "someimage.txt",
        bytes: 1024,
      },
    })
    expect(data).toEqual({
      type: "generic",
      key: expect.stringMatching(
        /^f[/]mezine[/]articles[/]123[/]([a-z0-9]+)[.]txt$/
      ),
      url: expect.stringMatching(
        /^https[:][/][/]files[.]host[.]com[/]f[/]mezine[/]articles[/]123[/]([a-z0-9]+)[.]txt$/
      ),
    })
  })

  it("should generate an image file from a fileInfo", async () => {
    const data = generateResource({
      origin: "https://files.host.com",
      subpath: "mezine/articles/123",
      fileInfo: {
        type: "image",
        filename: "someimage.jpg",
        bytes: 1024,
        width: 640,
        height: 480,
      },
    })
    expect(data).toEqual({
      type: "image",
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
