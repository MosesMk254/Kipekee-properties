import { Outlet } from "react-router-dom";
import Navbar from "../components/public/Navbar";
import Footer from "../components/public/Footer";

const ClientLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col font-sans text-brand-dark antialiased">
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default ClientLayout;
