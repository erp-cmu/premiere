import useAuth from "@/hooks/auth";
import { NavLink, Outlet } from "react-router";

function Layout() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <nav className="navbar bg-base-300 shadow-lg sticky top-0 z-50 border-b border-base-200">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost text-xl font-bold normal-case">
            Premiere Innova
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="hidden lg:flex gap-2">
            <NavLinkWrapper to="/">Home</NavLinkWrapper>
            {!currentUser && <NavLinkWrapper to="/login">Login</NavLinkWrapper>}
            {currentUser && <NavLinkWrapper to="/stock">Stock</NavLinkWrapper>}
            {currentUser && (
              <button
                onClick={logout}
                className="btn btn-sm btn-outline hover:btn-error"
              >
                Logout
              </button>
            )}
          </div>
          <Drawer currentUser={currentUser} logout={logout} />
        </div>
        {currentUser && (
          <div className="ml-4 hidden lg:block">
            <Avatar currentUser={currentUser} />
          </div>
        )}
      </nav>

      <main className="flex-1 p-4 lg:p-8 mx-auto w-full max-w-7xl">
        <Outlet />
      </main>

      <footer className="bg-base-300 text-center py-6 border-t border-base-200 mt-auto">
        <p className="text-sm text-base-content opacity-70">
          © 2026 Premiere Innova. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
export default Layout;

const Avatar = ({
  inDrawer = false,
  currentUser = "",
}: {
  inDrawer?: boolean;
  currentUser?: string;
}) => {
  if (inDrawer) {
    return (
      <div className="flex items-center gap-4 p-4 mb-4 bg-base-300 rounded-lg">
        <div className="avatar online">
          <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://i.pravatar.cc/150?img=32" alt="User Avatar" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-lg">{currentUser ?? ""}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="avatar online">
      <div className="w-10 rounded-full">
        <img src="https://i.pravatar.cc/150?img=32" alt="User Avatar" />
      </div>
    </div>
  );
};

interface DrawerProps {
  currentUser: string | null | undefined;
  logout: () => void;
}

const Drawer = ({ currentUser, logout }: DrawerProps) => {
  return (
    <div className="drawer drawer-end lg:hidden">
      <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer-1" className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="drawer-side z-40">
        <label
          htmlFor="my-drawer-1"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content gap-1">
          {currentUser && <Avatar inDrawer currentUser={currentUser ?? ""} />}
          <li className="menu-title">
            <span className="text-lg font-semibold">Menu</span>
          </li>
          <li>
            <NavLinkWrapper to="/">Home</NavLinkWrapper>
          </li>
          {!currentUser && (
            <li>
              <NavLinkWrapper to="/login">Login</NavLinkWrapper>
            </li>
          )}
          {currentUser && (
            <>
              <li>
                <NavLinkWrapper to="/stock">Stock</NavLinkWrapper>
              </li>
              <li className="border-t border-base-300 mt-2 pt-2">
                <button onClick={logout} className="text-error font-semibold">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

interface Props {
  to: string;
  children: React.ReactNode;
  disabled?: boolean;
}
const NavLinkWrapper = ({ to, children, disabled }: Props) => {
  if (disabled) {
    return <span className="text-base-content opacity-50">{children}</span>;
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `btn btn-ghost btn-sm ${isActive ? "btn-active" : ""}`
      }
    >
      {children}
    </NavLink>
  );
};
