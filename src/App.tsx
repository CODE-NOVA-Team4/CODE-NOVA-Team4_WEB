import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Splash from './pages/Splash/Splash.tsx';
import Welcome from './pages/Welcome/Welcome.tsx';
import Login from './pages/Login/Login.tsx';
import Home from './pages/Home/Home.tsx';
import Profile from './pages/Home-Profile/Profile.tsx';
import Hcategory from './pages/Home-category/Hcategory.tsx';
import SearchWindow from './pages/Home-searchwindow/SearchWindow.tsx';
import SearchResult from './pages/Home-Search-Searchresult/Searchresult.tsx';
import Setting from './pages/Home-profile-setting/Setting.tsx';
import Expense from './pages/Home-profile-expense/Expense.tsx';
import Scrap from './pages/Home-prrofile-scrap/Scrap.tsx';

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
        <Route path="/Home" element={
          <PageTransition isSlide={false}>
            <Home />
          </PageTransition>
        } />
        <Route path="/Profile" element={
          <PageTransition isSlide={false}>
            <Profile />
          </PageTransition>
        } />
        <Route path="/Hcategory/:name" element={
          <PageTransition isSlide={false}>
            <Hcategory />
          </PageTransition>
        } />
        <Route path="/Search" element={
          <PageTransition isSlide={false}>
            <SearchWindow />
          </PageTransition>
        } />
         <Route path="/result" element={
          <PageTransition isSlide={false}>
            <SearchResult />
          </PageTransition>
        } />
        <Route path="/setting" element={
          <PageTransition isSlide={false}>
            <Setting />
          </PageTransition>
        } />
        <Route path="/profile/:number" element={
          <PageTransition isSlide={false}>
            <Expense />
          </PageTransition>
        } />
        <Route path="/scrap" element={
          <PageTransition isSlide={false}>
            <Scrap />
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