import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { IoEyeOff } from 'react-icons/io5';
import { auth } from '../Firebase/Firebase.config';
import { toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom'; // add this

const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [show, setShow] = useState(false);
  const { signInWithEmailAndPasswordFunc, user } = useContext(AuthContext);
  const navigate = useNavigate(); // init navigate

  const handlesignout = async () => {
    try {
      await signOut(auth);
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Error signing out: ' + error.message);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Google Signin Successful');
      navigate('/', { replace: true }); // go home
    } catch (e) {
      console.error('Error during Google Signin:', e);
      toast.error('Google Signin Failed: ' + (e?.message || e));
    }
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    const email = e.currentTarget.email?.value;
    const password = e.currentTarget.password?.value;

    try {
      await signInWithEmailAndPasswordFunc(email, password);
      toast.success('Logged in');
      navigate('/', { replace: true }); // go home
    } catch (e) {
      console.error('Error logging in:', e);
      toast.error(e?.message || 'Login failed');
    }
  };

  return (
    <section className="min-h-screen ">
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse max-w-6xl mx-auto gap-10">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800 bg-clip-text text-transparent">
              Login to TravelEase
            </h1>
            <p className="py-6 text-gray-600">
              Sign in to manage vehicles, bookings, and trips with ease.
            </p>
          </div>

          <div className="card bg-white border border-gray-200 w-full max-w-sm shadow-xl rounded-2xl">
            {user ? (
              <div className="text-center space-y-3 p-6">
                <img
                  src={
                    user.photoURL ||
                    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                      user.displayName || user.email || 'User'
                    )}`
                  }
                  alt={user.displayName || 'User avatar'}
                  className="h-20 w-20 rounded-full mx-auto object-cover bg-gray-100"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                      user.displayName || user.email || 'User'
                    )}`;
                  }}
                />
                <h2 className="text-2xl font-semibold text-gray-800">
                  Welcome, {user.displayName || 'User'}
                </h2>
                <p className="text-gray-600">{user.email}</p>
                <button
                  onClick={handlesignout}
                  className="btn w-full text-white rounded-xl border-0 bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800 hover:from-gray-900 hover:to-zinc-900 mt-3"
                  type="button"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <form onSubmit={handleSignin} method="post" className="card-body">
                <fieldset className="fieldset space-y-2">
                  <label className="label text-slate-700" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="input input-bordered rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
                    placeholder="Email"
                    required
                    autoComplete="email"
                  />

                  <div className="relative">
                    <label className="label text-slate-700" htmlFor="password">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type={show ? 'text' : 'password'}
                      className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
                      placeholder="Password"
                      required
                      autoComplete="current-password"
                    />
                    <span
                      onClick={() => setShow(!show)}
                      className="absolute right-[20px] top-[32px] z-50 cursor-pointer text-gray-500"
                    >
                      {show ? <FaEye /> : <IoEyeOff />}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between text-sm">
                    <a className="link link-hover text-slate-700" href="/forgot-password">
                      Forgot password?
                    </a>
                  </div>

                  <button
                    className="btn w-full text-white rounded-xl border-0 bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800 hover:from-gray-900 hover:to-zinc-900 mt-2"
                    type="submit"
                  >
                    Login
                  </button>

                  <p className="mt-3 text-center text-sm text-gray-600">
                    Don&apos;t have an account?{' '}
                    <a href="/Register" className="link link-hover font-medium text-slate-800">
                      Register here
                    </a>
                  </p>

                  <div className="divider my-3">or</div>

                  <button
                    type="button"
                    onClick={handleGoogleSignin}
                    className="flex items-center justify-center gap-3 border border-gray-300 bg-white text-gray-800 px-5 py-2 rounded-xl w-full font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="google"
                      className="w-5 h-5"
                    />
                    Continue with Google
                  </button>
                </fieldset>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;