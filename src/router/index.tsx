import { createBrowserRouter } from "react-router-dom";
import APP from '../App.tsx'
import White from "../whiteScreen.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <APP />,
    

    },
    {
        path: "/White",
        element: <White />,

    },
])


export default router;