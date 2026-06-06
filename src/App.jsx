import "./index.css";
import { LandingPage } from "./pages/LandingPage";
import { Navbar } from "./ui/Navbar";
import { Footer } from "./ui/Footer";

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
