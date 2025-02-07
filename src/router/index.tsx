import { createBrowserRouter } from "react-router-dom";
import DEMOPAGE from '../pages/demoPage.tsx'
import White from "../pages/whiteScreenPage/whiteScreen.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DEMOPAGE />,

    },
    {
        path: "/White",
        element: <White />,

    },
])


export default router;