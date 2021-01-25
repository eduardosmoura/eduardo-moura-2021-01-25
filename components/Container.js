import React from 'react';
import Navbar from './navigation/Navbar';
import Footer from './navigation/Footer';

const Container = ({ children }) => (
  <div>
    <Navbar />
    {children}
    <Footer />
  </div>
);

export default Container;
