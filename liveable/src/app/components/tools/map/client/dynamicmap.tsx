'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { MapForm } from '@/lib/utils/forms';
const MapClient = dynamic(() => import('../map'), { ssr: false });

export interface DataProps {
  formData: MapForm;
}

export default function MapComponent({ formData }: DataProps): React.ReactNode {
  return (
    <MapClient formData={formData} />
  );
}