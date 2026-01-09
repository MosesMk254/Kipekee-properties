import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import ClientLayout from "./layouts/ClientLayout";

// Pages
import Home from "./pages/public/Home";
import PropertyDetails from "./pages/public/PropertyDetails";
import Properties from "./pages/public/Properties";
import About from "./pages/public/About";
import Blog from "./pages/public/Blog";
import BlogDetails from "./pages/public/BlogDetails";
import Contact from "./pages/public/Contact";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES (Client Side) */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          {/* Future routes like Properties, Contact will go here */}
          <Route path="about" element={<About />} />
          <Route path="properties" element={<Properties />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog />} />

          <Route path="properties/:id" element={<PropertyDetails />} />
          <Route path="blog/:id" element={<BlogDetails />} />
        </Route>

        {/* ADMIN ROUTES (Dashboard) - We will build this next */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        {/* <Route path="/admin" element={<AdminLayout />}> ... </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
