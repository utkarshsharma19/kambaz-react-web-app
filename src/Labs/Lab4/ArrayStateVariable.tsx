import React, { useState } from "react";
import { Button } from "react-bootstrap";

export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);

  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };

  const deleteElement = (index: number) => {
    setArray(array.filter((_, i) => i !== index));
  };

  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>

      {/* green “Add” button */}
      <Button variant="success" onClick={addElement} className="mb-2">
        Add Element
      </Button>

      <ul className="list-unstyled">
        {array.map((item, index) => (
          <li key={index}>
            {item}

            {/* red “Delete” button */}
            <Button
              variant="danger"
              size="sm"
              className="ms-2"
              onClick={() => deleteElement(index)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>

      <hr />
    </div>
  );
}
