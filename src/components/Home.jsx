import { useContext } from "react"
import { AppContext } from "../App"

export default function Home(params) {
    const { userData, isLoading, error } = useContext(AppContext)
    return (
        <>
            <div>
                <p>Home shit</p>
            </div>
        </>
    )
}
