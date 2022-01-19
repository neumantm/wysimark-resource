# AWS S3 and CloudFront

## Uploaded Files

Uploaded generic files

url: `files.wysimark.com/f/a/b/c/alphanumeric.txt`
uri: `/f/a/b/c/alphanumeric.txt`
querystring: ""
key: `f/a/b/c/alphanumeric.txt`

Upload image files include size to help with display and resizing

url: `files.wysimark.com/f/a/b/c/filename--640x480.jpg`
key: `f/a/b/c/alphanumeric--640x480.jpg`

Valid image file extensions. Throw an error if an image upload is attempted with a different file extension.
`jpg`, `jpeg`, `png`, `gif`

## Remap when query string exists

Every resource in `f` will map to the directory `fq` if a `querystring` is
present. This will allow us to support future upgrades without changing the API.

url: `files.wysimark.com/f/a/b/c/alphanumeric.txt?a=alpha`
uri: `/fq/a/b/c/alphanumeric.txt`
querystring: `a=alpha`
key: `fq/a/b/c/alphanumeric.txt?a=alpha`

NOTE: This is curently an invalid query. The only valid query at the time of writing is an image resize.

Processed requests are handled by a `Next.js` API hosted using Vercel.

## Image Processing

url: `files.wysimark.com/f/a/b/c/alphanumeric--640x480?size=320x240`
uri: `/f/a/b/c/alphanumeric--640x480`
querystring: `size=320x240`
key: `fq/a/b/c/alphanumeric--640x480.png?size=320x240`

- If it's not a supported image extension, it fails
- Must provide width and height to `size`
- Must be in a valid image format

## Types

Types of Objects

- Unrecognized
- File
  - GenericFile
  - ImageFile
- Query
  - UnrecognizedQuery
  - ImageQuery

Type of Info

- Filename
- Key
- URL
- URI
