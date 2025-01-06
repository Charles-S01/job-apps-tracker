import { Link } from "react-router-dom"

export default function ErrorPage(params) {
    return (
        <>
            <div className="flex h-full w-full items-center justify-center bg-blue-100">
                <div className="error-box flex flex-col gap-4 rounded-xl border-2 border-black bg-white p-4 shadow-lg">
                    <p className="">
                        <strong>Something went wrong...</strong>
                    </p>
                    <p>
                        Please{" "}
                        <Link to={"/login"} className="text-blue-500 underline">
                            log in
                        </Link>{" "}
                        to use the application
                    </p>
                </div>
            </div>
        </>
    )
}
