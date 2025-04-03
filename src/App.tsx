import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.tsx";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<div>Главная страница</div>} />
          <Route path="/catalog" element={<div>Каталог</div>} />
          <Route path="/about" element={<div>О нас</div>} />
          <Route path="/contacts" element={<div>Контакты</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
