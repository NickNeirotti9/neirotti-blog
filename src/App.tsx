import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Browse from "./pages/Browse";
import Portfolio from "./pages/Portfolio";
import PortfolioPost from "./pages/PortfolioPost";
import Disclaimer from "./pages/Disclaimer";
import Post from "./pages/Post";
import Search from "./pages/Search";
import ScrollToTop from "./components/ScrollToTop";

// The post editor only exists while developing (npm start). The condition is a
// build-time constant, so the editor code is left out of the production bundle.
const EditorPage =
  process.env.NODE_ENV === "development"
    ? React.lazy(() => import("./editor/EditorPage"))
    : null;

const App: React.FC = () => {
  return (
    <div id="page-container">
      <Router>
        <ScrollToTop />
        <Navbar />
        <div id="content-wrap">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/portfolio/:slug" element={<PortfolioPost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            {EditorPage && (
              <Route
                path="/editor"
                element={
                  <React.Suspense fallback={<div style={{ padding: 24 }}>Loading editor…</div>}>
                    <EditorPage />
                  </React.Suspense>
                }
              />
            )}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
