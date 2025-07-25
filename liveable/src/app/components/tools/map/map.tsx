import React, { useEffect, useState } from 'react';
import { MapContainer, GeoJSON, useMap } from 'react-leaflet';
import { FeatureCollection, Feature } from 'geojson';
import 'leaflet/dist/leaflet.css';
import { HouseLineIcon } from '@phosphor-icons/react';
import { DataProps } from './client/dynamicmap';
import { DivOverlay } from 'leaflet';
import { annualToMonthly, calculateMapMortgage } from '@/lib/utils/tools';
import LegendComponent from './legendcomponent';
import { formatCurrency } from '@/lib/utils/format';

function getColor(percent: number): string {
  return percent < .15 ? '#1a9641' :
         percent < .25 ? '#a6d96a' :
         percent < .28 ? '#adad83' :
         percent < .35 ? '#fdae61' :
                         '#d7191c' ;
}

function HomeButton(): React.ReactNode {
  const map = useMap();
  const homeClick = () => {
    map.setView([38.82, -97.58], 5);
  };
  return (
    <button id='home-button' onClick={homeClick}><HouseLineIcon size={24}/></button>
  );
}

export default function MapClient({ formData }: DataProps): React.ReactElement {
  const [geoData, setGeoData] = useState<FeatureCollection>();

  useEffect(() => {
    fetch('/data/us-states.json')
      .then(resp => resp.json())
      .then(setGeoData);
  }, []);

  
  function geoJsonStyle(feature?: Feature) {
    const homePrice = feature?.properties?.price ?? 0;
    const monthlyPayment = calculateMapMortgage(formData, homePrice);
    const percent = monthlyPayment / annualToMonthly(formData.salary);
    
    return {
      fillColor: getColor(percent),
      fillOpacity: .7
    };
  }

  function onEachFeature(feature: Feature, layer: DivOverlay) {
    const homePrice = feature?.properties?.price ?? 0;
    const monthlyPayment = calculateMapMortgage(formData, homePrice);
    const percent = monthlyPayment / annualToMonthly(formData.salary);
    const color = getColor(percent);

    layer.on({
      mouseover: () => {
        layer.bringToFront();
      },
    });

    layer.bindTooltip(
      `<div style="color: ${color}; padding: .5rem 1rem; border: 2px solid ${color}; border-radius: 12px;">
        <h3>${feature?.properties?.name}</h2>
        <p>Median House Price: $${formatCurrency(homePrice)}</p>
        <p>Percent of income: ${(percent * 100).toFixed(2)}%</p>
      </div>`, { sticky: true }
    );
  } 

  return (
    <MapContainer
      center={[38.82, -97.58]}
      zoom={4}
      zoomSnap={0.5}
    >
      {
        geoData && 
        <GeoJSON 
          key={JSON.stringify(formData)}
          data={geoData} 
          onEachFeature={onEachFeature}
          style={geoJsonStyle}
        />
      }
      <HomeButton />
      <LegendComponent />
    </MapContainer>
  );
}