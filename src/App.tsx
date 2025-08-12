// src/App.tsx
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import Header from "./sections/Header/Header";
import Hero from "./sections/Hero/Hero";
import Footer from "./sections/Footer/Footer";
import "./App.css";

// 遅延読み込み対象
const WhoWeAre = lazy(() => import("./sections/WhoWeAre/WhoWeAre"));
const Phases = lazy(() => import("./sections/Phases/Phases"));
const HowWeConnect = lazy(() => import("./sections/HowWeConnect/HowWeConnect"));
const Vision = lazy(() => import("./sections/Vision/Vision"));
const CTA = lazy(() => import("./sections/CTA/CTA"));
const ContactPage = lazy(() => import("./sections/Contact/ContactPage"));

// スクロール位置リセット
const ScrollToTop = () => {
  const location = useLocation();
  const { pathname, hash } = location;

  useEffect(() => {
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

// ホームページ
const HomePage = () => {
  return (
    <main>
      <Hero />
      <Suspense fallback={null}>
        <WhoWeAre />
        <Phases />
        <HowWeConnect />
        <Vision />
        <CTA />
      </Suspense>
    </main>
  );
};

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Header />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </HashRouter>
  );
}

export default App;
