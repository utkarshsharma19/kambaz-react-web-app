// PathParameters.tsx
import React, { useState } from "react";
import FormControl from "react-bootstrap/FormControl";

const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER as string;

export default function PathParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  return (
    <div>
      <h3>Path Parameters</h3>

      <FormControl
        className="mb-2"
        id="wd-path-parameter-a"
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />

      <FormControl
        className="mb-2"
        id="wd-path-parameter-b"
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />

      <a
        id="wd-path-parameter-add"
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/add/${a}/${b}`}
      >
        Add&nbsp;{a}&nbsp;+&nbsp;{b}
      </a>

      <a
        id="wd-path-parameter-subtract"
        className="btn btn-danger me-2"
        href={`${HTTP_SERVER}/lab5/subtract/${a}/${b}`}
      >
        Subtract&nbsp;{a}&nbsp;-&nbsp;{b}
      </a>

      <a
        id="wd-path-parameter-multiply"
        className="btn btn-success me-2"
        href={`${HTTP_SERVER}/lab5/multiply/${a}/${b}`}
      >
        Multiply&nbsp;{a}&nbsp;*&nbsp;{b}
      </a>

      <a
        id="wd-path-parameter-divide"
        className="btn btn-warning"
        href={`${HTTP_SERVER}/lab5/divide/${a}/${b}`}
      >
        Divide&nbsp;{a}&nbsp;/&nbsp;{b}
      </a>

      <hr />
    </div>
  );
}
