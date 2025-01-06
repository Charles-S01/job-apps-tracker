import { useContext } from "react"
import { AppContext } from "../App"
import LoadingIcon from "./icons/LoadingIcon"
import EditIcon from "./icons/EditIcon"
import { Link } from "react-router-dom"
import useUser from "../hooks/useUser"

export default function Profile(params) {
    const { data: userData, isLoading } = useUser()

    if (isLoading) {
        return (
            <>
                <LoadingIcon />
            </>
        )
    }

    return (
        <>
            <div className="flex flex-1 flex-col items-center gap-4">
                <p className="text-3xl">
                    <strong>Profile</strong>
                </p>

                <div className="profile-box relative flex w-full max-w-96 flex-col gap-4 rounded-xl border-2 border-blue-900 bg-white p-4 shadow-lg">
                    <Link to={`/profile/edit`} className="right-2 top-2 self-start">
                        <button className="flex gap-1 rounded-lg p-2 opacity-60 hover:bg-gray-500 hover:bg-opacity-10 hover:opacity-100">
                            <p>Edit</p>
                            <EditIcon />
                        </button>
                    </Link>
                    <div className="flex flex-col">
                        <p className="opacity-60">Full name</p>
                        <p className="text-xl">
                            {userData.user.firstName} {userData.user.lastName}
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <p className="opacity-60">Username</p>
                        <p className="text-xl">{userData.user.username}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
