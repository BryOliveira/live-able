import Link from 'next/link';
import Image from 'next/image';

/**
 * Renders the global navigation bar component for the application.
 * 
 * @returns The rendered NavBar component as a ReactNode.
 */
export default function Navbar(): React.ReactNode {
  return (
    <header>
      <nav>
        <Link href='/'>
          <Image 
            src='/liveable-logo-transparent.png'
            width={220}
            height={50}
            alt='Liveable transparent logo'
          />
        </Link>
        <ul>
          <li><Link href='../jobs'>Jobs</Link></li>
          <li id='drop-parent'>
            <Link href=''>Tools</Link>
            <ul id='dropdown'>
              <li><Link href='../tools/calc'>Liveability Calculator</Link></li>
              <li><Link href='../tools/map'>Liveability Interactive Map</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}