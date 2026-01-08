import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout";
import Hero from "./components/public/Hero";

// The Home Page Assembly
const Home = () => {
  return (
    <div>
      <Hero />

      <section className="py-20 bg-brand-gray text-center">
        <h2 className="text-3xl font-heading font-bold mb-4">
          Latest Properties
        </h2>
        <p className="text-gray-500">Property grid coming next...</p>
      </section>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
