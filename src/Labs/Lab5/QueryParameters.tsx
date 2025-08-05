import { useState } from "react";
import FormControl from "react-bootstrap/FormControl";

const HTTP_SERVER = import.meta.env.VITE_HTTP_SERVER;

export default function QueryParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  return (
    <div id="wd-query-parameters">
      <h3>Query Parameters</h3>

      <FormControl
        id="wd-query-parameter-a"
        className="mb-2"
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <FormControl
        id="wd-query-parameter-b"
        className="mb-2"
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />

      {/* ADD */}
      <a
        id="wd-query-parameter-add"
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}
      >
        Add&nbsp;{a}&nbsp;+&nbsp;{b}
      </a>

      {/* SUBTRACT */}
      <a
        id="wd-query-parameter-subtract"
        className="btn btn-danger me-2"
        href={`${HTTP_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}
      >
        Subtract&nbsp;{a}&nbsp;-&nbsp;{b}
      </a>

      {/* MULTIPLY */}
      <a
        id="wd-query-parameter-multiply"
        className="btn btn-success me-2"
        href={`${HTTP_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}
      >
        Multiply&nbsp;{a}&nbsp;*&nbsp;{b}
      </a>

      {/* DIVIDE */}
      <a
        id="wd-query-parameter-divide"
        className="btn btn-warning"
        href={`${HTTP_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}
      >
        Divide&nbsp;{a}&nbsp;/&nbsp;{b}
      </a>

      <hr />
    </div>
  );
}
