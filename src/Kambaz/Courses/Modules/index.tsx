export default function Modules() {
  return (
    <table>
      <tbody>
        <tr>
          <td>
            <button>Collapse All</button>
            <button>View Progress</button>

            <span className="field">
              <select id="wd-group" name="wd-group">
                <option value="assignment">Publish All</option>
                <option value="quiz">Publish 1</option>
                <option value="exam">Select Many</option>
              </select>
            </span>

            <button>+ Module</button>

            <ul id="wd-modules">
              {/* Week 1 */}
              <li className="wd-module">
                <div className="wd-title">Week 1</div>
                <ul className="wd-lessons">
                  <li className="wd-lesson">
                    <span className="wd-title">LEARNING OBJECTIVES</span>
                    <ul className="wd-content">
                      <li className="wd-content-item">Introduction to the course</li>
                      <li className="wd-content-item">Learn what is Web Development</li>
                    </ul>
                  </li>
                </ul>
              </li>

              {/* Week 2 */}
              <li className="wd-module">
                <div className="wd-title">Week 2</div>
                <ul className="wd-lessons">
                  <li className="wd-lesson">
                    <span className="wd-title">HTML BASICS</span>
                    <ul className="wd-content">
                      <li className="wd-content-item">HTML Tags</li>
                      <li className="wd-content-item">Headings and Paragraphs</li>
                      <li className="wd-content-item">Lists: Ordered and Unordered</li>
                    </ul>
                  </li>
                </ul>
              </li>

              {/* Week 3 */}
              <li className="wd-module">
                <div className="wd-title">Week 3</div>
                <ul className="wd-lessons">
                  <li className="wd-lesson">
                    <span className="wd-title">ADVANCED HTML</span>
                    <ul className="wd-content">
                      <li className="wd-content-item">Tables and Forms</li>
                      <li className="wd-content-item">Semantic Elements</li>
                      <li className="wd-content-item">Embedding Images and Videos</li>
                    </ul>
                  </li>
                </ul>
              </li>

              {/* Week 4 */}
              <li className="wd-module">
                <div className="wd-title">Week 4</div>
                <ul className="wd-lessons">
                  <li className="wd-lesson">
                    <span className="wd-title">CSS INTRO</span>
                    <ul className="wd-content">
                      <li className="wd-content-item">CSS Selectors</li>
                      <li className="wd-content-item">Colors and Fonts</li>
                      <li className="wd-content-item">Box Model</li>
                    </ul>
                  </li>
                </ul>
              </li>

              {/* Week 5 */}
              <li className="wd-module">
                <div className="wd-title">Week 5</div>
                <ul className="wd-lessons">
                  <li className="wd-lesson">
                    <span className="wd-title">ADVANCED CSS</span>
                    <ul className="wd-content">
                      <li className="wd-content-item">Flexbox</li>
                      <li className="wd-content-item">Grid Layout</li>
                      <li className="wd-content-item">Media Queries</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
