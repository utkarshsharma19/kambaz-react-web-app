import React, { useState, useEffect } from "react";

function getBreakpoint(width) {
  if (width < 576)   return "xs";
  if (width < 768)   return "sm";
  if (width < 992)   return "md";
  if (width < 1200)  return "lg";
  if (width < 1400)  return "xl";
  return "xxl";
}

export default function BreakpointIndicator() {
  const [bp, setBp] = useState(getBreakpoint(window.innerWidth));

  useEffect(() => {
    const onResize = () => setBp(getBreakpoint(window.innerWidth));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return <div className="breakpoint-indicator">{bp}</div>;
}
