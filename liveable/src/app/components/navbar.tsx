import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
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
          <li><Link href='jobs'>Jobs</Link></li>
          <li><Link href='tools'>Tools</Link></li>
        </ul>
      </nav>
    </header>
  );
};