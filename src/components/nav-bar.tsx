import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Forecast", path: "/forecast" },
    { label: "Data", path: "/data-dash" },
  ];

  return (
    <nav className="w-full bg-gray-200 text-black shadow-md px-6 py-3 flex items-center mb-2 justify-between">
      {/* Logo */}
      <div className="font-bold text-lg">
        {(() => {
          const current = navItems.find((i) => i.path === location.pathname);
          if (current) return `${current.label} Page`;
          const parts = location.pathname.split("/").filter(Boolean);
          if (parts.length === 0) return "Home Page";
          return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" ") + " Page";
        })()}
      </div>

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
