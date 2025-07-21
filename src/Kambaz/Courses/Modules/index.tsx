import ListGroup from "react-bootstrap/ListGroup";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router-dom";
import * as db from "../../Database/index";

export default function Modules() {
  const { cid } = useParams();
  const modules = db.modules.filter((module: any) => module.course === cid);

  return (
    <div>
      <ModulesControls />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((module: any, index: number) => (
          <ListGroup.Item key={index} className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title d-flex justify-content-between align-items-center p-3 ps-2 bg-secondary">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                {module.name}
              </div>
              <ModuleControlButtons />
            </div>

            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any, idx: number) => (
                  <ListGroup.Item
                    key={idx}
                    className="wd-lesson d-flex justify-content-between align-items-center
                               p-3 ps-3 border-0 border-start border-start-5 border-success"
                  >
                    <div>
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name}
                    </div>
                    <LessonControlButtons />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
