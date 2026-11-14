import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Mainlayout from "./layouts/Mainlayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";
import CaseStudyPage from "./pages/CaseStudyPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Mainlayout />}>
      <Route index element={<HomePage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="projects" element={<ProjectsPage />} />
      <Route path="projects/:slug" element={<CaseStudyPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
