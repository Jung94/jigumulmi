export default async function uploadImageToS3(presignedUrl: string, file: File) {
  const response = await fetch(
    new Request(presignedUrl, {
      method: "PUT",
      body: file,
      headers: new Headers({
        "Content-Type": file.type
      })
    })
  )
  return response
}