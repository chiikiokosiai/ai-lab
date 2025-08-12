// src/App.tsx
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./sections/Header/Header";
import Hero from "./sections/Hero/Hero";
import WhoWeAre from "./sections/WhoWeAre/WhoWeAre";
import Phases from "./sections/Phases/Phases";
import HowWeConnect from "./sections/HowWeConnect/HowWeConnect";
import Vision from "./sections/Vision/Vision";
import CTA from "./sections/CTA/CTA";
import Footer from "./sections/Footer/Footer";
import ContactPage from "./sections/Contact/ContactPage";
import "./App.css";

// スクロール位置をリセットするコンポーネント
const ScrollToTop = () => {
  const location = useLocation();
  const { pathname, hash } = location;

  useEffect(() => {
    // @ts-ignore: scrollIntoViewの型定義の問題を一時的に回避
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

// ホームページのコンポーネント
const HomePage = () => {
  return (
    <main>
      <Hero />
      <WhoWeAre />
      <Phases />
      <HowWeConnect />
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
