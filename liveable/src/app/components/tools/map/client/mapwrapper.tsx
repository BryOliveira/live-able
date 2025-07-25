'use client';
import React, { useState } from "react";
import SalaryComponent from "./salarycomponent";
import MapComponent from "./dynamicmap";
import { MapForm } from "@/lib/utils/forms";

const defaultValues = {
  downPayment: 55000,
  salary: 78500,
  loanTerm: 30,
  interestRate: 6.8
}

/**
 * Renders the main wrapper for the Liveability Map tool.
 *
 * This component manages the state for the map form and passes it down to child components.
 * It displays a header, a salary input component, and the map visualization component.
 *
 * @returns The rendered map wrapper component as a ReactNode.
 */
export default function MapWrapper(): React.ReactNode {
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