const getBase64 = (file: any) => {
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

export const formatInformationDoctos = async (files: any, idAccount: number, idCDocto: number): Promise<any[]> => {
  const formattedDoctos = []

  if (files?.length > 0) {
    for (const file of files) {
      if (file) {
        const streamString = String(await getBase64(file))
        const partsStream = streamString.split(',')
        const blackListFileTypes = ['asp', 'javascript', 'html', 'python', 'shellscript', 'msdos', 'plain']

        if (file.type && blackListFileTypes.some(fileType => file.type.includes(fileType))) {
          console.log(`Type ${file.type} not allowed`)
        } else if (file.type && file.type !== '') {
          formattedDoctos.push({
            idAccount,
            idCDocto,
            idDocto: null,
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
