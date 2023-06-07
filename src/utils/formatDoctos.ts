import axios, { AxiosResponse } from 'axios'

export const fileToBase64 = (file: any) => {
  const data = new Promise(resolve => {
    let baseURL: any = ''
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      baseURL = reader.result
      resolve(baseURL)
    }
  })

  return data
}

export const getFileFromUrl = async (url: string, fileName: string): Promise<any> => {
  try {
    const response: AxiosResponse<ArrayBuffer> = await axios.get(url, {
      responseType: 'arraybuffer'
    })

    const file = new File([response.data], fileName)

    return file
  } catch (error) {
    throw new Error(`Error fetching file from URL: ${error}`)
  }
}

export const formatInformationDoctos = async (
  files: any,
  idAccount: number,
  idCDocto: number,
  doctoIdByName: any
): Promise<any[]> => {
  const formattedDoctos = []

  if (files?.length > 0) {
    for (const file of files) {
      if (file) {
        const streamString = String(await fileToBase64(file))
        const partsStream = streamString.split(',')
        const blackListFileTypes = ['asp', 'javascript', 'html', 'python', 'shellscript', 'msdos', 'plain']

        if (file.type && blackListFileTypes.some(fileType => file.type.includes(fileType))) {
          console.log(`Type ${file.type} not allowed`)
        } else if (file.type && file.type !== '') {
          formattedDoctos.push({
            idAccount,
            idCDocto,
            idDocto: doctoIdByName[file?.name],
            name: file?.name,
            docto: {
              name: file?.name,
              type: file?.type,
              base64: partsStream[1]
            }
          })
        }
      }
    }
  }

  return formattedDoctos
}
