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

/**
 * Returns a color code based on the given percentage value.
 *
 * @param percent - A number representing the percentage to map to a color.
 * @returns A hex color string corresponding to the input percentage.
 */
function getColor(percent: number): string {
  return percent < .15 ? '#1a9641' :
         percent < .25 ? '#a6d96a' :
         percent < .28 ? '#adad83' :
         percent < .35 ? '#fdae61' :
                         '#d7191c' ;
}

/**
 * HomeButton component renders a button that, when clicked, resets the map view
 * to a predefined "home" location and zoom level.
 *
 * @returns A button ReactNode with a house icon that recenters the map.
 *
 * @remarks
 * - Uses the `useMap` hook to access the map instance.
 * - Sets the map view to coordinates [38.82, -97.58] with zoom level 5 on click.
 */
function HomeButton(): React.ReactNode {
  const map = useMap();
  const homeClick = () => {
    map.setView([38.82, -97.58], 5);
  };
  return (
    <button id='home-button' onClick={homeClick}><HouseLineIcon size={24}/></button>
  );
}

/**
 * Renders an interactive map displaying US states with color-coded regions based on mortgage affordability.
 *
 * @param formData - The form data containing user input such as salary and mortgage parameters.
 * @returns A ReactElement containing the map, geojson overlays, and UI controls.
 *
 * The map loads US states GeoJSON data and styles each state based on the percentage of monthly income
 * required for a mortgage payment at the median home price. Tooltips provide detailed information for each state.
 */
export default function MapClient({ formData }: DataProps): React.ReactElement {
  const [geoData, setGeoData] = useState<FeatureCollection>();

  useEffect(() => {
    fetch('/data/us-states.json')
      .then(resp => resp.json())
      .then(setGeoData);
  }, []);

  
  /**
   * Generates a style object for a GeoJSON feature based on its home price and the user's salary.
   *
   * Calculates the monthly mortgage payment for the given feature's price using the provided form data,
   * then determines the percentage of the user's monthly salary that the payment represents.
   * Returns a style object with a fill color determined by this percentage and a fixed opacity.
   *
   * @param feature - The GeoJSON feature containing property data, including price.
   * @returns An object specifying the `fillColor` and `fillOpacity` for the feature.
   */
  function geoJsonStyle(feature?: Feature) {
    const homePrice = feature?.properties?.price ?? 0;
    const monthlyPayment = calculateMapMortgage(formData, homePrice);
    const percent = monthlyPayment / annualToMonthly(formData.salary);
    
    return {
      fillColor: getColor(percent),
      fillOpacity: .7
    };
  }

  /**
   * Handles the logic for each map feature (each state), including calculating mortgage affordability,
   * determining the color based on the percentage of income spent, and binding a styled tooltip
   * to the map layer. Also brings the layer to the front on mouseover.
   *
   * @param feature - The GeoJSON feature representing a map area, containing property data such as price and name.
   * @param layer - The map layer (DivOverlay) associated with the feature, used to attach events and tooltips.
   */
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