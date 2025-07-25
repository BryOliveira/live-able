import 'leaflet/dist/leaflet.css';
import '@/styles/map-styles.css';
import React from 'react';
import { Metadata } from 'next';
import MapWrapper from '@/app/components/tools/map/client/mapwrapper';

export const metadata: Metadata = { title: 'Map' };

/**
 * Renders the map page of the application.
 *
 * This component serves as the entry point for the map tool,
 * displaying the `MapWrapper` component which contains the map UI and related logic.
 *
 * @returns The rendered map page as a ReactNode.
 */
export default function MapPage(): React.ReactNode {
  return (
    <MapWrapper />
  );
}