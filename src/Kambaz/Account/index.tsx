import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountNavigation from "./Navigation";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";

export default function Account() {
  const { currentUser } = useSelector((s: any) => s.accountReducer);

  return (
    <div id="wd-account-screen">
      <h2>Account</h2>
      <table>
        <tbody>
          <tr>
            <td valign="top">
              <AccountNavigation />
            </td>
            <td valign="top">
              <Routes>
                <Route
                  index
                  element={
                    <Navigate
                      to={currentUser ? "Profile" : "Signin"}
                      replace
                    />
                  }
                />
                <Route path="Signin" element={<Signin />} />
                <Route path="Signup" element={<Signup />} />
                <Route path="Profile" element={<Profile />} />
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
