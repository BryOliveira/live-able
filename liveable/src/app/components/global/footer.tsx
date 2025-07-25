import Image from 'next/image';
import Link from 'next/link';

/**
 * Renders the global footer component for the application.
 *
 * @returns The rendered footer component as a ReactNode.
 */
export default function Footer(): React.ReactNode {
  return (
    <>
    <footer>
      <div>
        <Image src='/plant-solo.png'
          width={48}
          height={48}
          alt='plant-image'
        />
        <ul>
          <li><Link href='../info/about'>About Us </Link></li>
          <li><Link href='../info/contact'>Contact Us</Link></li>
          <li><Link href='../info/credits'>Credits</Link></li>
        </ul>
        <ul>
          <li>&copy; 2025 Bryan Oliveira.<br /> All rights reserved.</li>
        </ul>
      </div>
    </footer>
    </>
  );
}