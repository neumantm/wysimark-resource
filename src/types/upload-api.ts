import { UploadFileInfo } from "./upload-file-info"
import { Simplify } from "type-fest"

/**
 * Upload Props and Response
 */

// export type UploadDemoProps = {
//   file: UploadFileInfo
//   options: Record<string, string>
// }

// export type UploadHostedProps = {
//   file: UploadFileInfo
//   options: {
//     app: string // app name
//     path: string
//     apiKeyId: string
//     apiSecretKey: string
//     limit?: {
//       path: string
//       bytes: number
//     }
//   }
// }

// export type UploadCustomProps = {
//   file: UploadFileInfo
//   options: Record<string, string>
// }

// export type UploadProps =
//   | UploadDemoProps
//   | UploadHostedProps
//   | UploadCustomProps

/**
 * Uploading using the Demo API has no special properties
 */
export type DemoAPIUploadProps = {
  file: UploadFileInfo
}

/**
 * Upload a file with the api key and secret out in public.
 *
 * This means that anybody that has upload access in your app will have access
 * to the secret keys allowing them to upload without limit.
 *
 * It's useful for:
 *
 * 1. Trying Wysimark uploads out
 * 2. When your main user is yourself or a group of trusted people like staff
 * 3. To start when you just want to get things going.
 *
 * Eventually, for an app with untrusted users, you will want to upgrade to
 * the private upload which can be authenticated.
 */
export type SecretAPIUploadProps = {
  type: "secret"
  file: UploadFileInfo
  appName: string // app name
  path: string
  apiKeyId: string
  apiSecretKey: string
  limit?: {
    path: string
    bytes: number
  }
}

export type JWTAPIUploadProps = {
  type: "jwt"
  jwt: string
}

export type JWTAPIUploadPayload = {
  type: "jwt"
  file: UploadFileInfo
  appName: string // app name
  path: string
  apiKeyId: string
  limit?: {
    path: string
    bytes: number
  }
  iat: number
}

/**
 * Upload a file without the api key and secret visible.
 *
 * Instead, the call is made to an API endpoint that the developer controls.
 */
export type CustomAPIUploadProps = {
  type: "custom"
  file: UploadFileInfo
  data: Record<string, string>
}

/**
 * NOTE:
 *
 * We no longer provide the Editor Upload Props here as it's not a cross
 * library concern and therefore adds an unnecessary step to modify the Editor.
 */

export type UploadSuccessResponse = {
  status: "success"
  data: {
    formFields: Record<string, string>
    apiUrl: string
    fileUrl: string
  }
}

export type UploadErrorResponse = {
  status: "error"
  message: string
}

export type UploadResponse = UploadSuccessResponse | UploadErrorResponse
