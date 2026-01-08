import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout";

const Home = () => (
  <div className="h-[120vh]">
    <div className="h-screen bg-slate-700 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div className="z-20 text-center">
        <h1 className="text-6xl text-white font-bold mb-4">
          Find Your Dream Home
        </h1>
        <p className="text-xl text-brand-gold italic">
          Luxury Real Estate in Kenya
        </p>
      </div>
    </div>
    <div className="p-20 text-center">
      <h2 className="text-4xl mb-4">Latest Properties</h2>
      <p>Scroll down to see the header change color.</p>
    </div>
  </div>
);

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
