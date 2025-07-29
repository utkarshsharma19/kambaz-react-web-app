import { useState } from "react";
import { FormControl } from "react-bootstrap";

/**
 * Convert a JS Date → “YYYY‑MM‑DD” string for an <input type="date" />.
 * Uses toISOString so there’s no off‑by‑one in the day or month.
 */
const toHtmlDate = (d: Date) => d.toISOString().slice(0, 10);

export default function DateStateVariable() {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div id="wd-date-state-variables">
      <h2>Date State Variables</h2>

      {/* raw JS Date object */}
      <h3>{JSON.stringify(startDate)}</h3>

      {/* formatted YYYY‑MM‑DD */}
      <h3>{toHtmlDate(startDate)}</h3>

      {/* controlled form field */}
      <FormControl
        type="date"
        value={toHtmlDate(startDate)}
        onChange={(e) => setStartDate(new Date(e.target.value))}
        className="w-auto"
      />

      <hr />
    </div>
  );
}
