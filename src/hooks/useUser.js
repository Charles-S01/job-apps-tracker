import { useQuery } from "@tanstack/react-query"
import { getUser } from "../api/user"

export default function useUser(params) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["userData"],
        queryFn: () => getUser(),
    })
    return { data, isLoading, error }
}
