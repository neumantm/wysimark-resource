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
export type DirectAPIUploadProps = {
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

export type JwtApiUploadProps = {
  jwt: string
}

export type JwtApiUploadPayload = {
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
  file: UploadFileInfo
  data: Record<string, string>
}

/**
 * Takes a set of API Props and turns it into a set of UploadProps for use
 * in the editor.
 */
type EditorPropsType<
  K extends string,
  T extends Record<string, any>
> = Simplify<
  {
    type: K
  } & Omit<T, "file">
>

// export type CustomUploadEditorProps = {
//   type: "custom"
//   data: Record<string, string>
// }

// export type DemoEditorUploadProps = EditorPropsType<"demo", UploadDemoProps>

// export type CloudEditorUploadProps = EditorPropsType<"cloud", UploadAPIProps>

// export type CustomEditorUploadProps = EditorPropsType<
//   "custom",
//   CustomUploadAPIProps
// >

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
