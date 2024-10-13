import { useState, useRef } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import GoogleSigninButton from "./Auth/GoogleSignInButton";
import PropTypes from "prop-types";
import NavBar from "./NavBar";
import AnimatedXPage from "./Animations/AnimatedXPage";
import { useAppContext } from "../services/utils";
import "../App.css";

function SignUp({ onBackToLogin }) {
  const { userRegister } = useAppContext();
  let [showPassword, setShowPassword] = useState(false);
  let [showConfirmPassword, setShowConfirmPassword] = useState(false);
  let [signUpData, setSignUpData] = useState({});

  let password_label = useRef();
  let password_input = useRef();
  let confirmPasswordInput = useRef();

  function onInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;

    setSignUpData((current) => ({ ...current, [name]: value }));
  }

  // handle submit
  function onLogFormSubmit(e) {
    e.preventDefault();
    e.target.reset();
    userRegister(signUpData);
  }

  function toggle_show_password() {
    setShowPassword((current) => !current);
    if (!showPassword) {
      password_input.current.type = "text";
    } else {
      password_input.current.type = "password";
    }
  }

  function toggleShowConfirmpassword() {
    setShowConfirmPassword((current) => !current);
    if (!showConfirmPassword) {
      confirmPasswordInput.current.type = "text";
    } else {
      confirmPasswordInput.current.type = "password";
    }
  }

  return (
    <>
    <NavBar></NavBar>
    <AnimatedXPage>
    <div className="flex items-center justify-center h-screen">
      <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
        <form onSubmit={onLogFormSubmit} className="space-y-5">
          <div>
            <label className="font-medium">First Name</label>
            <input
              type="first_name"
              name="first_name"
              // onClick={onInputClick}
              onChange={onInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-dark bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Last Name</label>
            <input
              type="last_name"
              name="last_name"
              // onClick={onInputClick}
              onChange={onInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-dark bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              // onClick={onInputClick}
              onChange={onInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-dark bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Password</label>
            <input
              type="password"
              name="password"
              ref={password_label}
              // onClick={onInputClick}
              onChange={onInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-dark bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label className="font-medium">Confirm Password</label>

            <input
              type="password"
              name="confirm-password"
              ref={confirmPasswordInput}
              // onClick={onInputClick}
              onChange={onInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-dark bg-transparent outline-none border shadow-sm rounded-lg"
            />
          </div>

          <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
            Sign Up
          </button>

          <p className='text-center'>OR</p>
          <GoogleSigninButton></GoogleSigninButton>

          <Link
            to={"/signin"}
            className="flex items-center gap-1 text-sm text-gray-900 duration-150 font-medium"
          >
            Already have an account
            <span
              className="text-indigo-600 hover:text-indigo-400"
              onClick={onBackToLogin}
            >
              Sign In
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-indigo-600 hover:text-indigo-400"
            >
              <path
                fillRule="evenodd"
                d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </form>
      </div>
    </div>
    </AnimatedXPage>
    </>
  );
}

SignUp.propTypes = {
  onBackToLogin: PropTypes.func.isRequired,
};
export default SignUp;
