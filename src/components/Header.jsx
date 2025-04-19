function Header() {
    return (
      <header className="bg-blue-600 text-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">CPU Scheduling Simulator</h1>
          <ul className="flex space-x-6 text-lg">
            <li><a href="#" className="hover:text-gray-300">Home</a></li>
            <li><a href="#" className="hover:text-gray-300">About</a></li>
            <li><a href="#" className="hover:text-gray-300">Demo</a></li>
          </ul>
        </nav>
      </header>
    );
  }
  
  export default Header;
  