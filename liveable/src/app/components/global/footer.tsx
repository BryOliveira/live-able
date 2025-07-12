import Image from 'next/image';

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
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Credits</li>
        </ul>
        <ul>
          <li>&copy; 2025 Bryan Oliveira . All rights reserved.</li>
        </ul>
      </div>
    </footer>
    </>
  );
}