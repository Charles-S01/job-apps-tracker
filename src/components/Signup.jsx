import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUser } from "../api/user"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function Signup(params) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <SignupComponent />
            </QueryClientProvider>
        </>
    )
}

function SignupComponent(params) {
    const navigate = useNavigate()

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [errorMessage, setErrorMessage] = useState()

    const { mutateAsync: createUserMutation } = useMutation({
        mutationFn: () => createUser({ firstName, lastName, username, password }),
        onError: (error) => setErrorMessage(error.response.data.message),
        onSuccess: () => navigate("/login"),
    })

    async function handleSignup(e) {
        e.preventDefault()
        await createUserMutation()
    }

    return (
        <>
            <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-white">
                <div className="flex basis-96 flex-col gap-2">
                    <div className="login-box flex w-full flex-col items-center gap-4 rounded-lg bg-zinc-900 p-4">
                        <p className="text-2xl">Sign up</p>

                        {errorMessage && (
                            <>
                                <p className="text-red-500">{errorMessage}</p>
                            </>
                        )}

                        <form onSubmit={handleSignup} className="flex flex-col gap-4 self-stretch">
                            <label className="flex flex-col gap-1">
                                <p>First name</p>
                                <input
                                    onChange={(event) => setFirstName(event.target.value)}
                                    type="text"
                                    placeholder="Enter first name"
                                    name="firstName"
                                    id="firstName"
                                    className="rounded-lg bg-zinc-800 p-1"
                                />
                            </label>
                            <label className="flex flex-col gap-1">
                                <p>Last name</p>
                                <input
                                    onChange={(event) => setLastName(event.target.value)}
                                    type="text"
                                    placeholder="Enter last name"
                                    name="lastName"
                                    id="lastName"
                                    className="rounded-lg bg-zinc-800 p-1"
                                />
                            </label>

                            <label className="flex flex-col gap-1">
                                <p>Username</p>
                                <input
                                    onChange={(event) => setUsername(event.target.value)}
                                    type="text"
                                    placeholder="Enter username"
                                    name="username"
                                    id="username"
                                    className="rounded-lg bg-zinc-800 p-1"
                                />
                            </label>
                            <label className="flex flex-col gap-1">
                                <p>Password</p>
                                <input
                                    onChange={(event) => setPassword(event.target.value)}
                                    type="password"
                                    placeholder="Enter password"
                                    name="password"
                                    id="password"
                                    className="rounded-lg bg-zinc-800 p-1"
                                />
                            </label>

                            <button className="self-stretch rounded-lg bg-white p-1 text-black">
                                Sign up
                            </button>
                        </form>

                        <div className="flex flex-col items-center gap-1">
                            <p>Already have an account?</p>
                            <Link to={"/login"}>
                                <button className="rounded-lg bg-green-600 p-2">Log in</button>
                            </Link>
                        </div>
                    </div>

                    <Link to={"/"}>
                        <p className="underline lg:hover:text-blue-600">Return to home page</p>
                    </Link>
                </div>
            </div>
        </>
    )
}
