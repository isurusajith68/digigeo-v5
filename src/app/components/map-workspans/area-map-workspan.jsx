"use client";

import React, { Suspense } from "react";

import { AreaMap } from "../maps/area-map";

export const AreaMapWorkspan = () => {
  return (
    <div className="flex">
      {/* <Suspense fallback={<Spinner />}> */}
        <AreaMap />
      {/* </Suspense> */}
    </div>
  );
};
