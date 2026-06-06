import "./index.css";
import { LandingPage } from "./pages/LandingPage";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <LandingPage />
      <Footer />
    </div>
  );
}

export default App;
