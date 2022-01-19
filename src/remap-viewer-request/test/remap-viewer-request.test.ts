import { extractRequestFromEvent, remapCloudFrontRequest } from ".."

import { CloudFrontRequest } from "../../types"

describe("mergeQueryIntoURI", () => {
  describe("extractRequestFromEvent", () => {
    it("should extract request from event", async () => {
      const event = {
        Records: [
          {
            cf: {
              config: {},
              request: {
                method: "GET",
                querystring: "",
                uri: "/",
              },
            },
          },
        ],
      }
      const request = extractRequestFromEvent(event)
      expect(request).toEqual({
        method: "GET",
        querystring: "",
        uri: "/",
      })
    })
  })

  describe("don't map to query", () => {
    it("should not map outside the f directory", async () => {
      const req: CloudFrontRequest = {
        uri: "/na/sample/text/alphabet.txt",
        querystring: "a=alpha dog",
      }
      const nextReq = remapCloudFrontRequest(req)
      expect(nextReq).toEqual({
        uri: "/na/sample/text/alphabet.txt",
        querystring: "a=alpha dog",
      })
      expect(nextReq).toEqual(req)
    })

    it("should not map if querystring is an empty string", async () => {
      const req: CloudFrontRequest = {
        uri: "/f/sample/text/alphabet.txt",
        querystring: "",
      }
      const nextReq = remapCloudFrontRequest(req)
      expect(nextReq).toEqual({
        uri: "/f/sample/text/alphabet.txt",
        querystring: "",
      })
      expect(nextReq).toEqual(req)
    })
  })

  describe("map to query", () => {
    it("should merge query into URI", async () => {
      const req: CloudFrontRequest = {
        uri: "/f/sample/text/alphabet.txt",
        querystring: "a=alpha",
      }
      const nextReq = remapCloudFrontRequest(req)
      expect(nextReq).toEqual({
        uri: "/fq/sample/text/alphabet.txt%3Fa%3Dalpha",
        querystring: "",
      })
      expect(nextReq).not.toEqual(req)
    })
    it("should merge and make sure escaping works", async () => {
      const req: CloudFrontRequest = {
        uri: "/f/sample/text/alphabet.txt",
        querystring: "a=alpha dog",
      }
      const nextReq = remapCloudFrontRequest(req)
      expect(nextReq).toEqual({
        uri: "/fq/sample/text/alphabet.txt%3Fa%3Dalpha%2Bdog",
        querystring: "",
      })
      expect(nextReq).not.toEqual(req)
    })
  })
})
