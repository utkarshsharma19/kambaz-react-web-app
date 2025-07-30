import React, { useState } from "react";
import { Button } from "react-bootstrap";

export default function Counter() {
  const [count, setCount] = useState(7);

  return (
    <div id="wd-counter-use-state">
      <h2>Counter: {count}</h2>

      {/* green “Up” button */}
      <Button
        variant="success"
        id="wd-counter-up-click"
        className="me-2"
        onClick={() => setCount(count + 1)}
      >
        Up
      </Button>

      {/* red “Down” button */}
      <Button
        variant="danger"
        id="wd-counter-down-click"
        onClick={() => setCount(count - 1)}
      >
        Down
      </Button>

      <hr />
    </div>
  );
}
