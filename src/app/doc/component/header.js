const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo text-xl font-bold">MedApp</div>
        <nav className="nav-links">
          <a href="#" className="px-4 hover:underline">Home</a>
          <a href="#" className="px-4 hover:underline">Doctors</a>
          <a href="#" className="px-4 hover:underline">Appointments</a>
          <a href="#" className="px-4 hover:underline">Medical Notes</a>
          <a href="#" className="px-4 hover:underline">Contact</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
