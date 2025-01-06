import { useContext, useState } from "react"
import { AppContext } from "../App"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUser } from "../api/user"
import { useNavigate } from "react-router-dom"
import BackButton from "./BackButton"
import useUser from "../hooks/useUser"

export default function ProfileEdit(params) {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { data: userData } = useUser()

    const [firstName, setFirstName] = useState(userData.user.firstName)
    const [lastName, setLastName] = useState(userData.user.lastName)

    const { mutateAsync: updateUserMutation } = useMutation({
        mutationFn: () => updateUser({ firstName, lastName }),
        onSuccess: () => {
            queryClient.invalidateQueries(["userData"])
            navigate(history.back())
        },
    })

    async function handleSubmit(e) {
        e.preventDefault()
        await updateUserMutation()
    }

    return (
        <>
            <div className="profile-edit-page relative flex flex-1 items-center justify-center">
                <BackButton />

                <div className="edit-box flex max-w-96 flex-1 flex-col gap-4 rounded-xl border-2 border-blue-900 bg-white p-4 shadow-lg">
                    <p className="text-2xl">
                        <strong>Edit profile</strong>
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <label className="flex flex-col">
                            <p>First name</p>
                            <input
                                type="text"
                                placeholder="first name"
                                name="firstName"
                                id="firstName"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                                className="rounded-lg bg-gray-400 bg-opacity-10 p-2"
                            />
                        </label>
                        <label className="flex flex-col">
                            <p>Last name</p>
                            <input
                                type="text"
                                placeholder="last name"
                                name="lastName"
                                id="lastName"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                                className="rounded-lg bg-gray-400 bg-opacity-10 p-2"
                            />
                        </label>
                        <button className="rounded-lg bg-blue-500 p-2 text-white">Finish</button>
                    </form>
                </div>
            </div>
        </>
    )
}
