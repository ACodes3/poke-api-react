import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './pageSetup/Footer';
import MainContent from './pageSetup/MainContent';
import NavbarComponent from './pageSetup/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComponent />
        <MainContent />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
