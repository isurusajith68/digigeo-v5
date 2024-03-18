"use client";

import React, { Suspense } from "react";

import { PropertiesMap } from "../maps/properties-map";

export const PropertiesMapWorkspan = () => {
  return (
    <div className="flex">
      {/* <Suspense fallback={<Spinner />}> */}
      <PropertiesMap />
      {/* </Suspense> */}
    </div>
  );
};
