import Navbar from '@/modules/Navbar';
// import Footer from '@/modules/Footer';
// import { ComponentPropsWithRef } from 'react';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="bg-white font-sans relative flex flex-col h-screen">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-[64rem] py-6 px-8 mt-4 antialiased font-sans bg-gray-200 overflow-hidden rounded">{children}</div>
        </div>
      </main>
    </>
  );
};

export default Layout;
