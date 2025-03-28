// src/App.tsx
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./sections/Header/Header";
import Hero from "./sections/Hero/Hero";
import Phases from "./sections/Phases/Phases";
import Vision from "./sections/Vision/Vision";
import CTA from "./sections/CTA/CTA";
import Footer from "./sections/Footer/Footer";
import ContactPage from "./sections/Contact/ContactPage";
import "./App.css";

// スクロール位置をリセットするコンポーネント
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      // URLにハッシュがある場合、該当要素にスクロール
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [pathname, hash]);

  return null;
};

// ホームページのコンポーネント
const HomePage = () => {
  return (
    <main>
      <Hero />
      <Phases />
      <Vision />
      <CTA />
    </main>
  );
};

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
}

export default App;
