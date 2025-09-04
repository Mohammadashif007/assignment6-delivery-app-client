import { Link, Outlet } from "react-router";
import Logo from "@/assets/logo/Logo"; // Make sure you have your logo here


export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r shadow-sm flex flex-col">
        <div className="p-6 flex items-center gap-2 border-b">
         <Logo></Logo>
          <span className="text-2xl font-bold">ParcelSender</span>
        </div>

        <nav className="flex-1 mt-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="block px-4 py-2 rounded hover:bg-accent hover:text-accent-foreground"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/send"
                className="block px-4 py-2 rounded hover:bg-accent hover:text-accent-foreground"
              >
                Send Parcel
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/shipments"
                className="block px-4 py-2 rounded hover:bg-accent hover:text-accent-foreground"
              >
                My Shipments
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/profile"
                className="block px-4 py-2 rounded hover:bg-accent hover:text-accent-foreground"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/settings"
                className="block px-4 py-2 rounded hover:bg-accent hover:text-accent-foreground"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-6 border-t flex flex-col gap-2">

          <button className="w-full bg-destructive text-destructive-foreground py-2 rounded hover:bg-destructive/90">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="flex justify-between items-center px-6 py-4 border-b bg-muted text-foreground">
          <h1 className="text-xl font-semibold"> Sender Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary/90">
            <Link to="/sender/create-parcel" className="bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary/90">Create Parcel</Link>
              
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet /> {/* Nested routes render here */}
        </main>
      </div>
    </div>
  );
}
