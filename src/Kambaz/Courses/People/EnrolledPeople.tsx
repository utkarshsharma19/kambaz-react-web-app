// src/Kambaz/Courses/People/Enrolled.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PeopleTable from "./Table";
import * as courseClient from "../client";

export default function EnrolledPeople() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (!cid) return;
    setLoading(true);
    try {
      const data = await courseClient.findUsersForCourse(cid);
      setUsers(data);
    } catch (e) {
      console.error("load course users:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [cid]);

  return (
    <div>
      <h3>People</h3>
      {loading && <div className="text-muted">Loading…</div>}
      <PeopleTable users={users} />
    </div>
  );
}
