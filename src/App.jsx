import { createContext, useState } from "react"
import "./App.css"
import { Link, Outlet, useLoaderData, useLocation, useNavigate } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import useUser from "./hooks/useUser"
import HamburgerIcon from "./components/icons/HamburgerIcon"
import HomeIcon from "./components/icons/HomeIcon"
import BookmarkIcon from "./components/icons/BookmarkIcon"
import LogoutIcon from "./components/icons/LogoutIcon"

const queryClient = new QueryClient()

export const AppContext = createContext({})

export default function App(params) {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AppComponent />
            </QueryClientProvider>
        </>
    )
}

function AppComponent() {
    const location = useLocation()
    const navigate = useNavigate()

    const { data: userData, isLoading, error } = useUser()
    const isLoggedIn = userData ? true : false

    const [sidebar, setSideBar] = useState(false)

    return (
        <>
            <div className="page m-0 flex h-full w-full overflow-auto bg-zinc-800 p-0 text-white">
                <div
                    className={`sidebar-view ${sidebar ? "block lg:static lg:z-0 lg:w-auto" : "hidden"} fixed z-10 flex h-full w-screen backdrop-blur-md backdrop-brightness-75`}
                >
                    <div className="sidebar flex h-full w-56 flex-col gap-4 bg-zinc-950 p-6 text-white">
                        <button onClick={() => setSideBar(!sidebar)} className="self-start">
                            <HamburgerIcon size={8} />
                        </button>

                        <div className="navigation mb-auto flex flex-col items-center gap-2 text-2xl">
                            <Link to={`/`} className="w-full">
                                <button
                                    className={`flex ${location.pathname === "/" && "bg-neutral-600"} w-full justify-center gap-2 rounded-lg p-2`}
                                >
                                    <HomeIcon size={8} />
                                    <p>Home</p>
                                </button>
                            </Link>
                            <Link to={`/bookmarks`} className="w-full">
                                <button
                                    className={`flex ${location.pathname === "/bookmarks" && "bg-neutral-600"} w-full justify-center gap-2 rounded-lg p-2`}
                                >
                                    <BookmarkIcon size={8} />
                                    <p>Bookmarks</p>
                                </button>
                            </Link>
                        </div>
                        <button
                            onClick={() => {
                                localStorage.removeItem("token")
                                navigate("/login")
                            }}
                            className="flex justify-center gap-2"
                        >
                            <LogoutIcon />
                            <p>Log out</p>
                        </button>
                    </div>

                    <div onClick={() => setSideBar(!sidebar)} className="glass flex-1"></div>
                </div>

                <div className="content flex flex-1 flex-col">
                    <header className="flex items-center justify-between bg-zinc-900 p-6 text-white">
                        <button onClick={() => setSideBar(!sidebar)}>
                            <HamburgerIcon size={8} />
                        </button>
                        <Link to={`/`}>
                            <p className="text-3xl">Job Applications</p>
                        </Link>
                        {!isLoggedIn ? (
                            <>
                                <Link to={"/login"}>
                                    <button className="rounded-lg bg-zinc-800 p-2">
                                        <p>Log in</p>
                                    </button>
                                </Link>
                            </>
                        ) : null}
                    </header>

                    <main className="flex w-full flex-1 justify-center self-center">
                        <div className="main-content-wrapper flex max-w-[75rem] flex-1 flex-col border-0 border-gray-500 px-4 pt-4">
                            <AppContext.Provider value={{ userData, isLoading, error }}>
                                <Outlet />
                            </AppContext.Provider>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
