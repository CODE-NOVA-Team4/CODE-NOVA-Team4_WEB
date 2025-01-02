import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Splash from './pages/Splash/Splash.tsx';
import Welcome from './pages/Welcome/Welcome.tsx';
import Login from './pages/Login/Login.tsx';

const PageTransition = ({ children, isSlide = false }: { children: React.ReactNode, isSlide?: boolean }) => {
  const pageVariants = isSlide ? {
    initial: { x: '100%' },
    in: { x: 0 },
    out: { x: '-100%' }
  } : {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ type: 'tween', duration: 0.3 }}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition isSlide={true}>
            <Splash />
          </PageTransition>
        } />
        <Route path="/welcome" element={
          <PageTransition isSlide={false}>
            <Welcome />
          </PageTransition>
        } />
        <Route path="/login" element={
          <PageTransition isSlide={false}>
            <Login />
          </PageTransition>
        } />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default App;