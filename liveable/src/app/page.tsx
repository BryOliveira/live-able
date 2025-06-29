import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>This is just a test fr fr.</h1>
      <Link href='/example' className='underline'>
        Example link.
      </Link>
    </main>
  );
}
