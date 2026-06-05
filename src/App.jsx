import "./index.css";
import { LandingPage } from "./pages/LandingPage";
import { Navbar } from "./ui/Navbar";

function App() {
  return (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <LandingPage />
  </div>
);
}

export default App;
