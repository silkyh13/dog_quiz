import React, { useState } from "react";

export default function AccordianButton({
  setOpenAccordian,
  openAccordian,
  size
}) {
  return (
    <button
      className="accordion"
      onClick={() => {
        setOpenAccordian(!openAccordian);
      }}
    >
      {size}
    </button>
  );
}
