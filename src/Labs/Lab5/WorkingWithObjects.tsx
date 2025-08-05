import { useState } from "react";
import FormControl   from "react-bootstrap/FormControl";
import Form          from "react-bootstrap/Form";
import Button        from "react-bootstrap/Button";
import * as client   from "./client";

export default function WorkingWithObjects() {
  /* assignment state */
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2025-10-10",
    completed: false,
    score: 0,
  });

  /* module state */
  const [module, setModule] = useState<any | null>(null);
  const [modEdit, setModEdit] = useState({ name: "", desc: "" });

  /* helpers ------------------------------------------------------------- */

  const refreshModule = async () => setModule(await client.fetchModule());

  /* render -------------------------------------------------------------- */

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      {/* ───────────────── Assignment ───────────────── */}
      <h4>Assignment</h4>
      <Form className="mb-2">
        <FormControl
          className="mt-1"
          placeholder="Title"
          value={assignment.title}
          onChange={e =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
        <Button
          className="mt-2"
          onClick={() => client.updateTitle(assignment.title)}
        >
          Save Title
        </Button>

        <FormControl
          className="mt-3"
          type="number"
          placeholder="Score"
          value={assignment.score}
          onChange={e =>
            setAssignment({ ...assignment, score: Number(e.target.value) })
          }
        />
        <Button
          className="mt-2 me-3"
          onClick={() => client.updateScore(assignment.score)}
        >
          Save Score
        </Button>

        <Form.Check
          className="mt-3"
          type="checkbox"
          label="Completed?"
          checked={assignment.completed}
          onChange={e => {
            setAssignment({ ...assignment, completed: e.target.checked });
            client.updateCompleted(e.target.checked);
          }}
        />
      </Form>

      <hr />

      {/* ───────────────── Module ───────────────── */}
      <h4>Module</h4>
      <Button className="me-2 mb-2" onClick={refreshModule}>
        Get Module
      </Button>
      <Button
        className="me-2 mb-2"
        onClick={async () => alert(await client.fetchModuleName())}
      >
        Get Module Name
      </Button>

      {module && (
        <div className="border rounded p-3 mb-3">
          <pre>{JSON.stringify(module, null, 2)}</pre>
        </div>
      )}

      <Form>
        <FormControl
          className="mt-1"
          placeholder="New module name"
          value={modEdit.name}
          onChange={e => setModEdit({ ...modEdit, name: e.target.value })}
        />
        <Button
          className="mt-2"
          onClick={async () => {
            await client.updateModuleName(modEdit.name);
            refreshModule();
          }}
        >
          Save Name
        </Button>

        <FormControl
          className="mt-3"
          placeholder="New module description"
          value={modEdit.desc}
          onChange={e => setModEdit({ ...modEdit, desc: e.target.value })}
        />
        <Button
          className="mt-2"
          onClick={async () => {
            await client.updateModuleDesc(modEdit.desc);
            refreshModule();
          }}
        >
          Save Description
        </Button>
      </Form>
      <hr />
    </div>
  );
}
