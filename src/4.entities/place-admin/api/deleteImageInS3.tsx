export default async function deleteImageInS3(presignedUrl: string) {
  const response = await fetch(
    new Request(presignedUrl, { method: "DELETE" })
  )
  return response
}