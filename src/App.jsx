import Mainlayout from "./layouts/Mainlayout"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import NotFound from "./components/NotFound"
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Mainlayout />} >
        <Route index element={<HomePage/>} />
        <Route path="/about" element={<AboutPage/>} />
      </Route>
        <Route path="*" element={<NotFound/>} />
    </>
  )
)

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
