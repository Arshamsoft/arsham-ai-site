const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    window.location.href = '/admin/login';
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">پنل مدیریت</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
      >
        خروج
      </button>
    </div>
  );
};

export default Navbar;