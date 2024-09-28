// Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between p-4 bg-blue-600 text-white">
      <div className="logo">MedApp</div>
      <nav className="nav-links">
        <a href="#" className="mx-2">Home</a>
        <a href="#" className="mx-2">Doctors</a>
        <a href="#" className="mx-2">Appointments</a>
        <a href="#" className="mx-2">Medical Notes</a>
        <a href="#" className="mx-2">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
