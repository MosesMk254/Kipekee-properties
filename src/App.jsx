import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import ClientLayout from "./layouts/ClientLayout";

// Pages
import Home from "./pages/public/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES (Client Side) */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          {/* Future routes like Properties, Contact will go here */}
        </Route>

        {/* ADMIN ROUTES (Dashboard) - We will build this next */}
        {/* <Route path="/admin" element={<AdminLayout />}> ... </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
