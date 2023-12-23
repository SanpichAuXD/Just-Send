// components/Navbar.js

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">
            <div className="text-white cursor-pointer">Home</div>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <div className="text-white cursor-pointer">About</div>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <div className="text-white cursor-pointer">Contact</div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
