import React, { useState, useEffect } from "react";
import Accordian from "./Accordian";
import AccordianButton from "./AccordianButton";
export default function CheatSheet({ size, grouped }) {
  const [openAccordian1, setOpenAccordian1] = useState(false);
  const [openAccordian2, setOpenAccordian2] = useState(false);
  const [openAccordian3, setOpenAccordian3] = useState(false);

  return (
    <div className="steps">
      <h1>CHEAT SHEET</h1>
      <AccordianButton
        openAccordian={openAccordian1}
        setOpenAccordian={setOpenAccordian1}
        size={"Small Dog"}
      />
      <Accordian
        grouped={grouped}
        sizeSet={size.small}
        openAccordian={openAccordian1}
      />

      <AccordianButton
        openAccordian={openAccordian2}
        setOpenAccordian={setOpenAccordian2}
        size={"Medium Dog"}
      />
      <Accordian
        grouped={grouped}
        sizeSet={size.medium}
        openAccordian={openAccordian2}
      />

      <AccordianButton
        openAccordian={openAccordian3}
        setOpenAccordian={setOpenAccordian3}
        size={"Large Dog"}
      />
      <Accordian
        grouped={grouped}
        sizeSet={size.large}
        openAccordian={openAccordian3}
      />
    </div>
  );
}
