import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import '@/styles/credit-styles.css';

export const metadata: Metadata = { title: 'Credits' };

export default function CreditsPage(): React.ReactNode {
  return (
    <div className='credits'>
      <h1>Credits</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Phosphor</td>
            <td>Helena Zhang and Tobias Fried</td>
            <td><Link href='https://phosphoricons.com/'>Phosphor Icons</Link></td>
          </tr>
          <tr>
            <td>Iconoir</td>
            <td>Luca Burgio</td>
            <td><Link href='https://iconoir.com/'>Iconoir Icons</Link></td>
          </tr>
          <tr>
            <td>Affor-db</td>
            <td>Felipe Cruz and Bryan Oliveira</td>
            <td><Link href='https://github.com/BryOliveira/affor-db'>Affor-db Repo</Link></td>
          </tr>
          <tr>
            <td>US GeoJSON</td>
            <td>Eric Celeste</td>
            <td><Link href='https://eric.clst.org/tech/usgeojson/'>US GeoJSON</Link></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
/**
 * Phosphor
 * Iconoir
 * Leaflet
 * https://eric.clst.org/tech/usgeojson/
 */
