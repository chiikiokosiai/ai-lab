// src/App.tsx
import Header from "./sections/Header/Header";
import Hero from "./sections/Hero/Hero";
import Phases from "./sections/Phases/Phases";
import Vision from "./sections/Vision/Vision";
import CTA from "./sections/CTA/CTA";
import Footer from "./sections/Footer/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Phases />
        <Vision />
        <CTA />
      </main>
      <Footer /> {/* コメントアウトを解除 */}
    </>
  );
}

export default App;
