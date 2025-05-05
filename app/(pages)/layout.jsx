import "../globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { EdgeStoreProvider } from "../lib/edgestore";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <EdgeStoreProvider>
      <main className="pt-16">{children}</main>
      </EdgeStoreProvider>
      <Footer />
    </>
  );
}
