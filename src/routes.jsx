import App from "./App"
import Bookmarks from "./components/Bookmarks"
import Bookmarked from "./components/Bookmarks"
import ErrorPage from "./components/ErrorPage"
import Home from "./components/Home"
import JobForm from "./components/JobForm"
import Login from "./components/Login"
import Profile from "./components/Profile"
import ProfileEdit from "./components/ProfileEdit"
import Signup from "./components/Signup"

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/profile",
                children: [
                    { index: true, element: <Profile /> },
                    { path: "edit", element: <ProfileEdit /> },
                ],
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
