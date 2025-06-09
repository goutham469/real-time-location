import Auth from "./pages/Auth";
import Details from "./pages/Details";
import Landing from "./pages/Landing";
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path:'',
        element:<Landing/>
    },
    {
        path:'auth',
        element:<Auth/>
    },
    {
        path:'user',
        element:<Details/>
    }
])

export default router;