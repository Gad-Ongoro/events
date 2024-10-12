import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import {
  faFacebook,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="text-gray-600 bg-gray-100 px-4 py-5 mx-auto">
      <div className="flex gap-6 justify-between">
        <div className="flex-1">
          <div className="max-w-xs">
            <h1 className="font-bold text-2xl text-indigo-600">Ticket Nexus</h1>
            <p className="text-gray-600 mt-2 text-base leading-6">
              You can always meet us around the corners where we plan and hold
              events for you. Now come and discover experiences out of this
              world with us.
            </p>
          </div>
        </div>
        <div className="flex-1 mt-10 flex gap-6 items-center justify-between">
          <ul className="space-y-2">
            <h4 className="text-gray-800 font-medium">Pages</h4>
            <li>
              <a href="/home" className="text-gray-600 hover:text-gray-800">Homes</a>
            </li>
            <li>
              <a href="/events" className="text-gray-600 hover:text-gray-800">Events</a>
            </li>
            <li>
              <NavLink to href="/signin" className="text-gray-600 hover:text-gray-800">Login</NavLink>
            </li>
          </ul>

          <ul className="space-y-2">
            <h4 className="text-gray-800 font-medium">Company</h4>
            <li>
              <a href="/" className="text-gray-600 hover:text-gray-800">Invest</a>
            </li>
            <li>
              <a href="/" className="text-gray-600 hover:text-gray-800">Partner</a>
            </li>
            <li>
              <a href="/" className="text-gray-600 hover:text-gray-800">Insurance Policy</a>
            </li>
          </ul>

          <ul className="space-y-2">
            <h4 className="text-gray-800 font-medium">FAQS</h4>
            <li>
              <a href="/" className="text-gray-600 hover:text-gray-800">About</a>
            </li>
            <li>
              <a href="/" className="text-gray-600 hover:text-gray-800">Customer service</a>
            </li>
            <li>
              <a href="/" className="text-gray-600 hover:text-gray-800">Partnership</a>
            </li>
            <li>
              <a href="/" className="text-gray-600 hover:text-gray-800">Terms & conditions</a>
            </li>
            <li>
              <a href="/" className="text-gray-600 hover:text-gray-800">Privacy & Policy</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-gray-300 flex items-center justify-between">
        <div className="mt-2 text-gray-600">
          © 2024 Ticket Nexus All rights reserved.
        </div>
        <div className="mt-4 flex items-center gap-4">
          <ul className="flex items-center gap-4">
            <li className="w-10 h-10 flex items-center justify-center cursor-pointer">
              <a href="#">
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
            </li>

            <li className="w-10 h-10 flex items-center justify-center cursor-pointer">
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </li>

            <li className="w-10 h-10 flex items-center justify-center cursor-pointer">
              <a href="#">
                <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
              </a>
            </li>

            <li className="w-10 h-10 flex items-center justify-center cursor-pointer">
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;