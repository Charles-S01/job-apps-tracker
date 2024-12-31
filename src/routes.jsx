import App from "./App"
import Home from "./components/Home"
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
        ],
    },
    { path: "/signup", element: <Signup /> },
    {
        path: "/login",
        element: <Login />,
    },
]

export default routes
