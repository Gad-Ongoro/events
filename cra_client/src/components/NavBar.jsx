import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAppContext } from "../services/utils";

function NavBar() {
  const { auth, handleLogout, userId } = useAppContext();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <NavLink to="/home" className="-m-1.5 p-1.5 text-2xl font-extrabold text-indigo-600">
              Ticket Nexus
            </NavLink>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link to="/home">Home</Link>
            <Link to="/events">Events</Link>
            {auth && <Link to={`/dashboard/${userId}/dashview`}>Dashboard</Link>}

          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {auth ? (
              <NavLink
                to="/signin"
                className="log_link p-1 px-4 border border-primary rounded-pill"
                exact = "true"
                onClick={handleLogout}
              >
                Logout
              </NavLink>
            ) : (
              <NavLink
                to="/signin"
                className="log_link p-1 px-4 border border-primary rounded-pill"
                exact = "true"
              >
                Login
              </NavLink>
            )}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6">
                  <Link className="log_link p-1 px-2 border border-primary rounded-pill" to="/home">
                    Home
                  </Link>
                </div>
                <div className="py-6">
                  <Link className="log_link p-1 px-2 border border-primary rounded-pill" to="/events">
                    Events
                  </Link>
                </div>
                <div className="py-6">
                  {auth ? (
                    <NavLink
                      to="/signin"
                      className="log_link p-1 px-2 border border-primary rounded-pill"
                      exact = "true"
                      onClick={handleLogout}
                    >
                      Logout
                    </NavLink>
                  ) : (
                    <NavLink
                      to="/signin"
                      className="log_link p-1 px-2 border border-primary rounded-pill"
                      exact = "true"
                    >
                      Login
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
}

export default NavBar;
