import React from "react";
import Link from 'next/link';

/**
 * Renders the navigation bar for the tools section, providing links to the
 * Liveability Calculator and Liveability Interactive Map.
 *
 * @returns The navigation bar component with tool links as a ReactNode.
 */
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