import React from "react";
import Listings from './listings';
import JobView from './jobview';

export default function Wrapper() {
  return (
    <div id="wrapper">
      <Listings />
      <JobView />
    </div>
  );
}