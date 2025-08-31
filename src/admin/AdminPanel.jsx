import { Outlet, Navigate } from "react-router-dom"
import Sidebar from "./components/Sidebar"
import Navbar from "./components/Navbar"

const AdminPanel = () => {
  const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true"

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminPanel
