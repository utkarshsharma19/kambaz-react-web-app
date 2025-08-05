import { useEffect, useState } from "react";
import FormControl from "react-bootstrap/FormControl";
import * as client from "./client";

interface Assignment {
  _id?: string;
  title: string;
  description: string;
  due: string;
  completed: boolean;
}

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<Assignment>({
    title: "",
    description: "",
    due: "",
    completed: false,
  });
  const [error, setError] = useState<string | null>(null);

  /* ── helpers ── */

  const fetchAssignment = async () => {
    try {
      const data = await client.fetchAssignment();
      setAssignment(data);
      setError(null);
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Could not load assignment");
    }
  };

  /** Updates only the title on the server, then merges the whole object
   *  returned by the API.  (No manual encode required; client handles it.) */
  const pushTitle = async (title: string) => {
    try {
      const data = await client.updateTitle(title);
      setAssignment(data);
      setError(null);
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Update failed");
    }
  };

  /* ── mount ── */
  useEffect(() => {
    fetchAssignment();
  }, []);

  /* ── render ── */
  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>

      <h4>Assignment</h4>

      <FormControl
        className="mb-2"
        value={assignment.title}
        placeholder="Title"
        onChange={e => setAssignment({ ...assignment, title: e.target.value })}
      />

      <FormControl
        as="textarea"
        rows={3}
        className="mb-2"
        value={assignment.description}
        placeholder="Description"
        onChange={e =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />

      <FormControl
        type="date"
        className="mb-2"
        value={assignment.due}
        onChange={e => setAssignment({ ...assignment, due: e.target.value })}
      />

      <div className="form-check form-switch mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="wd-completed"
          checked={assignment.completed}
          onChange={e =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="wd-completed">
          Completed
        </label>
      </div>

      <button
        className="btn btn-primary me-2"
        onClick={() => pushTitle(assignment.title)}
      >
        Update Title
      </button>

      {error && (
        <div className="alert alert-danger my-2" role="alert">
          {error}
        </div>
      )}

      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
    </div>
  );
}
