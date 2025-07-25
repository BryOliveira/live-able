'use client';
import 'leaflet/dist/leaflet.css';
import '@/styles/map-styles.css';
import React, { useState } from 'react';
import MapComponent from '@/app/components/tools/map/client/dynamicmap';
import SalaryComponent from '@/app/components/tools/map/client/salarycomponent';
import { MapForm } from '@/lib/utils/forms';

const defaultValues = {
  downPayment: 55000,
  salary: 78500,
  loanTerm: 30,
  interestRate: 6.8
}

export default function MapPage(): React.ReactNode {
  const [formData, setFormData] = useState<MapForm>(defaultValues);

  return (
    <div className='map-wrapper'>
      <div>
        <h1>Liveability Map</h1>
        <SalaryComponent formData={formData} setFormData={setFormData} />
      </div>
      <MapComponent formData={formData} />
    </div>
  );
}