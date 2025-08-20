import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Forecast", path: "/forecast" },
  ];

  return (
    <nav className="w-full bg-gray-200 text-black shadow-md px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="font-bold text-lg">BI Apps</div>

      {/* Menu */}
      <div className="flex gap-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-3 py-1 rounded-md transition-colors !text-black ${
              location.pathname === item.path
                ? "bg-[#bfc6c7]"
                : "hover:bg-gray-500"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
