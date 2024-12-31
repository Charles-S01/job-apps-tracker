import { useMutation } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { loginUser } from "../api/auth"

const queryClient = new QueryClient()

export default function Login(params) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <LoginComponent />
            </QueryClientProvider>
        </>
    )
}

function LoginComponent(params) {
    const navigate = useNavigate()

    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [message, setMessage] = useState()

    const { mutateAsync: loginUserMutation } = useMutation({
        mutationFn: () => loginUser({ username, password }),
        onError: (error) => setMessage(error.response.data.message),
        onSuccess: (data) => {
            localStorage.setItem("token", data.token)
            navigate("/")
        },
    })

    async function handleLogin(e) {
        e.preventDefault()
        await loginUserMutation()
    }

    return (
        <>
            <div className="flex h-full w-full items-center justify-center bg-zinc-800 text-white">
                <div className="flex basis-96 flex-col gap-2">
                    <div className="login-box flex w-full flex-col items-center gap-4 rounded-lg bg-zinc-900 p-4">
                        <p className="text-2xl">Log in</p>

                        {message && (
                            <>
                                <p className="text-red-500">{message}</p>
                            </>
                        )}

                        <form onSubmit={handleLogin} className="flex flex-col gap-4 self-stretch">
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
                                Log in
                            </button>
                        </form>

                        <div className="flex flex-col items-center gap-1">
                            <p>Don't have an account?</p>
                            <Link to={"/signup"}>
                                <button className="rounded-lg bg-blue-500 p-2">Sign up</button>
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
