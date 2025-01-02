import App from "./App"
import Bookmarks from "./components/Bookmarks"
import Bookmarked from "./components/Bookmarks"
import Home from "./components/Home"
import JobForm from "./components/JobForm"
import Login from "./components/Login"
import Signup from "./components/Signup"

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/bookmarks",
                element: <Bookmarks />,
            },
            {
                path: "/job-form/:jobId?",
                element: <JobForm />,
            },
        ],
    },
    { path: "/signup", element: <Signup /> },
    {
        path: "/login",
        element: <Login />,
    },
]

export default routes
