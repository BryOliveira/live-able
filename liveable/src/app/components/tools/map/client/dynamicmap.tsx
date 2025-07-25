'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { MapForm } from '@/lib/utils/forms';
const MapClient = dynamic(() => import('../map'), { ssr: false });

// Interface for TypeScript typing.
export interface DataProps {
  formData: MapForm;
}

/**
 * Renders the `MapClient` component with the provided form data.
 *
 * @param formData - The data to be passed to the `MapClient` component.
 * @returns The rendered `MapClient` ReactNode.
 */
export default function MapComponent({ formData }: DataProps): React.ReactNode {
  return (
    <MapClient formData={formData} />
  );
}