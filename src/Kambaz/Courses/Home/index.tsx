import Modules from "../Modules/index";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div id="wd-home">
      <h2>Home</h2>
      <table width="100%">
        <colgroup>
          <col />
          <col width="220" />
        </colgroup>
        <tbody>
          <tr style={{ verticalAlign: 'top' }}>
            <td>
              <Modules />
            </td>
            <td>
              <CourseStatus />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
