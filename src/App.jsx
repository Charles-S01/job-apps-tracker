import { createContext, useState } from "react"
import "./App.css"
import { Link, Outlet } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import useUser from "./hooks/useUser"
import HamburgerIcon from "./components/HamburgerIcon"

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
    const { data: userData, isLoading, error } = useUser()
    const isLoggedIn = userData ? true : false

    const [sidebar, setSideBar] = useState(false)

    return (
        <>
            <div className="m-0 flex h-full w-full overflow-auto bg-zinc-800 p-0 text-white">
                <div
                    className={`sidebar-view ${sidebar ? "block lg:static lg:z-0 lg:w-auto" : "hidden"} fixed z-10 flex h-full w-screen backdrop-blur-md backdrop-brightness-75`}
                >
                    <div className="sidebar flex h-full w-52 flex-col bg-zinc-950 p-6">
                        <button onClick={() => setSideBar(!sidebar)}>
                            <HamburgerIcon size={8} />
                        </button>
                    </div>
                    <div onClick={() => setSideBar(!sidebar)} className="glass flex-1"></div>
                </div>

                <div className="content flex flex-1 flex-col">
                    <header className="flex items-center justify-between bg-zinc-900 p-6">
                        <button onClick={() => setSideBar(!sidebar)}>
                            <HamburgerIcon size={8} />
                        </button>

                        <p className="text-3xl">Job Applications</p>
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
                        <div className="main-content-wrapper max-w-[70rem] flex-1 border-2 border-gray-500 p-4">
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
