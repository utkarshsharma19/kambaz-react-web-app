import { useState } from "react";
import { FormControl } from "react-bootstrap";

export default function ObjectStateVariable() {
  const [person, setPerson] = useState({ name: "Peter", age: 24 });

  /** reusable change handlers */
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPerson({ ...person, name: e.target.value });

  const handleAge = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPerson({
      ...person,
      age: parseInt(e.target.value || "0", 10), // guard against empty input
    });

  return (
    <div id="wd-object-state-variables">
      <h2>Object State Variables</h2>

      {/* pretty‑printed object */}
      <pre>{JSON.stringify(person, null, 2)}</pre>

      {/* name field */}
      <FormControl
        className="mb-2"
        placeholder="Name"
        value={person.name}
        onChange={handleName}
      />

      {/* age field */}
      <FormControl
        type="number"
        className="mb-2"
        placeholder="Age"
        value={person.age.toString()}
        onChange={handleAge}
      />

      <hr />
    </div>
  );
}
