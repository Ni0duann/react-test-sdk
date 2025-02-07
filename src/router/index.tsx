import { createBrowserRouter } from "react-router-dom";
import DEMOPAGE from '../pages/demoPage.tsx'
import White from "../pages/whiteScreenPage/whiteScreen.tsx";
import {Page1,Page2,Page3} from '../pages/clickPage/clickPages.tsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <DEMOPAGE />,

    },
    {
        path: "/White",
        element: <White />,

    },
    {
        path: "/Page1",
        element: <Page1 />,

    },
    {
        path: "/Page2",
        element: <Page2 />,

    },
    {
        path: "/Page3",
        element: <Page3 />,

    },
])


export default router;