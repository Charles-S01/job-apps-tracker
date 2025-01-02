import { useNavigate } from "react-router-dom"
import BackIcon from "./icons/BackIcon"

export default function BackButton(params) {
    const navigate = useNavigate()

    return (
        <>
            <button
                onClick={() => navigate(history.back())}
                className="absolute left-0 top-0 flex items-center gap-2 rounded-lg p-2 opacity-70 lg:hover:bg-zinc-900 lg:hover:opacity-100"
            >
                <BackIcon />
                <p>Back</p>
            </button>
        </>
    )
}
