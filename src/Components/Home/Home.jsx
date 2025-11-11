import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="w-11/12 mx-auto flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Home;

// <div className="min-h-screen flex flex-col">
//       <div className="w-11/12 max-w-7xl mx-auto flex-1 flex flex-col">
//         <Navbar />
//         <main className="flex-1 bg-[#D9D9D9]">
//           <Outlet />
//         </main>
//         <Footer />
//       </div>
//     </div>
//   );