import { Metadata } from 'next';
import React from 'react';
import '@/styles/about-styles.css';
import Link from 'next/link';

export const metadata: Metadata = { title: 'About Us' };

/**
 * Renders the About page for the application.
 *
 * @returns The rendered About page component as a ReactNode.
 */
export default function AboutPage(): React.ReactNode {
  return (
    <div className='about'>
      <h1>About <s>Me</s> Us</h1>
      <p>
        This entire site was a solo pet project made by me, <Link href='https://github.com/BryOliveira'>Bryan Oliveira</Link>, a Caltech CS Undergrad.
      </p>
      <p>
        In February 2025, I took a MySQL based Relational Databases course. For the final project, 
        my partner <Link href='https://github.com/PipeCruz'>Felipe Cruz</Link> and I decided on <Link href='https://github.com/BryOliveira/affor-db'>Affor-db</Link>, 
        a terminal based command-line Python application. 
        The data itself was SQL tables of job and company listings taken from a Kaggle Dataset and reference
        pre-processed data from Zillow&apos;s public datasets. 
      </p>
      <p>
        Though the app itself was functional, it lacked user-friendliness and required users
        to locally download the GitHub repo to access it. Wanting to improve both usability and accessibility, 
        I also saw an opportunity to deepen my React skills. After learning that React Native docs themselves suggest using a framework, I pivoted to using <strong>Next.js </strong>
        for a modern web-app experience.
        <strong style={{ color: 'var(--green-accent)' }}> Liveable</strong> is the result of that.
        Beyond that, the back-end uses MySQL, Prisma was used to make a convenient ORM, the app was deployed with Vercel, and the icons used are open-source libraries.
      </p>
    </div>
  );
}