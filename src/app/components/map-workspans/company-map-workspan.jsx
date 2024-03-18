"use client";

import React, { Suspense } from "react";

import { PropertiesMap } from "../maps/properties-map";
import { CompanyMap } from "../maps/company-map";

export const CompanyMapWorkspan = () => {
  return (
    <div className="flex">
      {/* <Suspense fallback={<Spinner />}> */}
      <CompanyMap />
      {/* </Suspense> */}
    </div>
  );
};
