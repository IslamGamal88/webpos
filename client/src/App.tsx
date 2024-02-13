import Catalogue from "./Pages/Catalogue";
import Home from "./Pages/Home";
import { AuthProvider } from "./contexts/authContext";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
