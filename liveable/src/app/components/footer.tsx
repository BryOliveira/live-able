import Image from 'next/image';

export default function Footer() {
  return (
    <>
    <footer>
      <div>
        <Image src="/plant-solo.png"
          width={48}
          height={48}
          alt="plant-image"
        />
        <ul>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
        <ul>
          <li>Something Copyright &copy;</li>
          <li>Pretty sure it's wrong. Liveable</li>
        </ul>
      </div>
    </footer>
    </>
  );
}