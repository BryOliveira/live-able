import 'leaflet/dist/leaflet.css';
import '@/styles/map-styles.css';
import React from 'react';
import { Metadata } from 'next';
import MapWrapper from '@/app/components/tools/map/client/mapwrapper';

export const metadata: Metadata = { title: 'Map' };

export default function MapPage(): React.ReactNode {
  return (
    <MapWrapper />
  );
}