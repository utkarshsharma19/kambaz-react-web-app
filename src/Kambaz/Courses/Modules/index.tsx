import CourseStatus from "../Home/Status";

export default function Modules() {
    return (
        <table>
          <tbody>
            <tr>
              {/* Left column: module details */}
              <td>
                <h2>Course 1234</h2>
                <button>Collapse All</button>
                <button>View Progress</button>
    
                <span className="field">
                  <label htmlFor="wd-group">Assignment Group</label>
                  <select id="wd-group" name="wd-group">
                    <option value="assignment">Assignment</option>
                    <option value="quiz">Quiz</option>
                    <option value="exam">Exam</option>
                  </select>
                </span>
    
                <button>+ Module</button>
    
                <ul id="wd-modules">
                  <li className="wd-module">
                    <div className="wd-title">Week 1</div>
                    <ul className="wd-lessons">
                      <li className="wd-lesson">
                        <span className="wd-title">LEARNING OBJECTIVES</span>
                        <ul className="wd-content">
                          <li className="wd-content-item">
                            Introduction to the course
                          </li>
                          <li className="wd-content-item">
                            Learn what is Web Development
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="wd-module">
                    <div className="wd-title">Week 2</div>
                  </li>
                  <li className="wd-module">
                    <div className="wd-title">Week 3</div>
                  </li>
                </ul>
              </td>
    
              {/* Right column: course status */}
              <td valign="top">
                <CourseStatus />
              </td>
            </tr>
          </tbody>
        </table>
      );
  }
  