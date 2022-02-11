import { UploadFileInfo } from "./upload-file-info"

/**
 * Upload Props and Response
 */

export type UploadDemoProps = {
  file: UploadFileInfo
  options: Record<string, string>
}

export type UploadHostedProps = {
  file: UploadFileInfo
  options: {
    app: string // app name
    path: string
    limit?: {
      path: string
      bytes: number
    }
  }
}

export type UploadCustomProps = {
  file: UploadFileInfo
  options: Record<string, string>
}

export type UploadProps =
  | UploadDemoProps
  | UploadHostedProps
  | UploadCustomProps

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
