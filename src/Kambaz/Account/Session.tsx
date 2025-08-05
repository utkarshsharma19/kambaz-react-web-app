import { useEffect, useState } from "react";
import { useDispatch }         from "react-redux";
import { setCurrentUser }      from "./reducer";
import * as client             from "./client";

export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try   { dispatch(setCurrentUser(await client.profile())); }
      catch (e) { console.error(e); }
      finally { setPending(false); }
    };
    fetchProfile();
  }, [dispatch]);

  if (pending) return null;      // or a spinner component
  return children;
}