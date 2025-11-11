import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { AuthContext } from '../Context/AuthContext';
import { updateProfile, signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";

const Register = () => {
  const { createUserWithEmailAndPasswordFunc } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const PhotoUrl = e.target.PhotoUrl.value;

    console.log("Login form submitted", { email, password, name, PhotoUrl });

    const regExp =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+])[A-Za-z\d@$!%*?&#^()\-_=+]{8,}$/;

    if (!regExp.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }

    createUserWithEmailAndPasswordFunc(email, password)
      .then(async (res) => {
        console.log("User registered successfully:", res);
        try {
          await updateProfile(res.currentUser, {
            displayName: name,
            photoURL: PhotoUrl,
          });
        } catch (err) {
          console.log("updateProfile error:", err);
        }
        await signOut(auth);
        toast.success("Account created successfully. Please log in.");
      })
      .catch((e) => {
        console.log(e.code);
        if (e.code === "auth/email-already-in-use") {
          toast.error("User already exists in the database. Etai bastob haahahahaha");
        } else if (e.code === "auth/weak-password") {
          toast.error("Bhai tomake at least 6 ta digit er pass dite hobe");
        } else if (e.code === "auth/invalid-email") {
          toast.error("Invalid email format. Please check your email.");
        } else if (e.code === "auth/user-not-found") {
          toast.error("User not found. Please sign up first.");
        } else if (e.code === "auth/wrong-password") {
          toast.error("Wrong password. Please try again.");
        } else if (e.code === "auth/user-disabled") {
          toast.error("This user account has been disabled.");
        } else if (e.code === "auth/too-many-requests") {
          toast.error("Too many attempts. Please try again later.");
        } else if (e.code === "auth/operation-not-allowed") {
          toast.error("Operation not allowed. Please contact support.");
        } else if (e.code === "auth/network-request-failed") {
          toast.error("Network error. Please check your connection.");
        } else {
          toast.error(e.message || "An unexpected error occurred.");
        }
      });
  };

  return (
    <section className="min-h-screen">
      <div className="hero min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse max-w-6xl mx-auto gap-10">
          {/* Left text */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-800 via-gray-800 to-zinc-800 bg-clip-text text-transparent">
              Create your TravelEase account
            </h1>
            <p className="py-6 text-gray-600">
              Register to list vehicles, manage bookings, and more.
            </p>
          </div>

          {/* Card */}
          <div className="card bg-white border border-gray-200 w-full max-w-sm shadow-xl rounded-2xl">
            <form onSubmit={handleLogin} method="post" className="card-body">
              <fieldset className="fieldset space-y-2">
                <label className="label text-slate-700" htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="input input-bordered rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
                  placeholder="Enter Your Name"
                  required
                />

                <label className="label text-slate-700" htmlFor="PhotoUrl">Photo URL</label>
                <input
                  id="PhotoUrl"
                  name="PhotoUrl"
                  type="url"
                  className="input input-bordered rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
                  placeholder="https://example.com/photo.jpg"
                  required
                />

                <label className="label text-slate-700" htmlFor="email">Email</label>
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
                  <label className="label text-slate-700" htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    type={show ? "text" : "password"}
                    className="input input-bordered w-full rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-300"
                    placeholder="Password"
                    required
                    autoComplete="new-password"
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute right-[20px] top-[32px]  z-50 cursor-pointer text-gray-500"
                    aria-label={show ? "Hide password" : "Show password"}
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
                  Register
                </button>

                <p className="mt-3 text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <a href="/Login" className="link link-hover font-medium text-slate-800">
                    Login
                  </a>
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;