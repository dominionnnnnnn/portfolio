import Mainlayout from "./layouts/Mainlayout"
import HomePage from "./pages/HomePage"
import AboutPage from "./pages/AboutPage"
import ProjectsPage from "./pages/ProjectsPage"
import NotFound from "./components/NotFound"
import ContactPage from "./pages/ContactPage"
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Mainlayout />} >
        <Route index element={<HomePage/>} />
        <Route path="/about" element={<AboutPage/>} />
        <Route path="/projects" element={<ProjectsPage/>} />
        <Route path="/contact" element={<ContactPage/>} />
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
