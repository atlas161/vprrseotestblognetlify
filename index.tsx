import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConstructionTrackingPage } from './components/ConstructionTrackingPage';
import { AboutPage } from './components/AboutPage';
import { BlogListPage } from './components/BlogListPage';
import { BlogArticlePage } from './components/BlogArticlePage';
import { ContactPage } from './components/ContactPage';
import { ZonePage } from './components/ZonePage';
import { InspectionBuildingsPage } from './components/InspectionBuildingsPage';
import { FaqPage } from './components/FaqPage';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chantier" element={<ConstructionTrackingPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogArticlePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/zone" element={<ZonePage />} />
        <Route path="/inspection" element={<InspectionBuildingsPage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
