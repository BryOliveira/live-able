import React from "react";
import Link from 'next/link';

export default function ToolNav(): React.ReactNode {
  return (
    <nav className='tool-nav'>
      <Link href='/tools/calc' className='tool-nav-link'>
        Liveability Calculator
      </Link>
      <Link href='/tools/map' className='tool-nav-link'>
        Liveability Interactive Map
      </Link>
    </nav>
  );
}