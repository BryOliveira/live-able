import { Metadata } from 'next';
import React from 'react';
import '@/styles/contact-styles.css';
import { Linkedin, Mail } from 'iconoir-react';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Contact Us' };

/**
 * Renders the Contact Us page for the application.
 *
 * @returns The rendered Contact Us page component as a ReactNode.
 */
export default function ContactPage(): React.ReactNode {
  return (
    <div className='contact'>
      <h1>Contact <s>Me</s> Us</h1>
        <p>
          If you run into any issues, or wanna ask any questions, you can add me on LinkedIn or email me. <br />
          I should respond <i>relatively</i> quickly.
        </p>
        <div>
          <Link href='https://www.linkedin.com/in/bryan-r-oliveira/'><Linkedin width={32} height={32} />My LinkedIn</Link>
          <Link href='mailto:boliveir@caltech.edu'><Mail width={32} height={32} /> My Email</Link>
        </div>
    </div>
  );
}