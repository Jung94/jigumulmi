import { useMutation } from "@tanstack/react-query";
import { postAPI } from "@/lib/api";
import { APIaccount } from "@/lib/api/account";

const usePostLogout = () => {
  const response = useMutation(
    [APIaccount.logout],
    () => postAPI({apiURL: APIaccount.logout}),
    {
      onSuccess: async (data) => {
        console.log(data)
        if (data.status === 201) document.location.reload()
      },
      onError: (error, variables, context) => {
        console.log("logout")
        console.log(error, variables, context)
      }
    })
  return response
}

export default usePostLogout

