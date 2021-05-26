import React, { useState } from "react";

export default function Accordian({ grouped, sizeSet, openAccordian }) {
  return (
    <div className={"panel " + (openAccordian ? "display" : "none")}>
      {grouped && (
        <div className="procedure">
          {sizeSet.map((item, i) => (
            <div className="steps" key={i}>
              <img alt="dog" src={item.url} />
              <div className="step-content">
                <div>{item.name}</div>
                <div>{item.height.imperial} lbs</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
