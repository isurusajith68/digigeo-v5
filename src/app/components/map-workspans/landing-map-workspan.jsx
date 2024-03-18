"use client";

import React, { Suspense } from "react";

 
import { LandingMap } from './../maps/landing-map';

export const LandingMapWorkspan = () => {
  return (
    <div className="flex">
      {/* <Suspense fallback={<Spinner />}> */}
      <LandingMap />
      {/* </Suspense> */}
    </div>
  );
};
