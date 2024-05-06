import { useMutation } from "@tanstack/react-query";
import { postAPI } from "@/lib/api";
import { APIaccount } from "@/lib/api/account";

export default function usePostDeregister () {
  const response = useMutation(
    [APIaccount.deregister],
    () => postAPI({apiURL: APIaccount.deregister}),
    {
      onSuccess: async (data) => {
        console.log(data)
        if (data.status === 201) {
          document.location.reload()
        }
      },
      onError: (error, variables, context) => {
        console.log(error, variables, context)
      }
    })
  return response
}

