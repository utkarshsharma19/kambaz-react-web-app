
import Modules from "../Modules/index";
import CourseStatus from "./Status";
export default function Home() {
    return (
        <table id="wd-home" width="100%">
          <colgroup>
            <col />
            <col width="220" />
          </colgroup>
          <tbody>
            <tr valign="top">
              <td>
                <Modules />
              </td>
              <td>
                <CourseStatus />
              </td>
            </tr>
          </tbody>
        </table>
      );
    }
