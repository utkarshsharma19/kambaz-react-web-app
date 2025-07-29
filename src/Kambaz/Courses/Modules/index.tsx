import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import { BsGripVertical } from "react-icons/bs";

import ModulesControls from "./ModulesControls";
import ModuleEditor from "./ModuleEditor";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import {
  addModule,
  deleteModule,
  editModule,
  updateModule,
} from "./reducer";

export default function Modules() {
  const { cid } = useParams();

  /* Redux hooks */
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch   = useDispatch();

  /* local state only for the modal text + visibility */
  const [moduleName, setModuleName] = useState("");
  const [showModal, setShowModal]   = useState(false);
  const reset = () => setModuleName("");
  return (
    <div className="wd-modules">
      {/* toolbar with +Module */}
      <ModulesControls openModal={() => setShowModal(true)} />

      {/* modal dialog for new module */}
      <ModuleEditor
        show={showModal}
        handleClose={() => { 
          reset();
          setShowModal(false)}}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid! }));
          setModuleName("");
          setShowModal(false);
        }}
      />

      <br /><br /><br />

      {/* list of modules filtered by course */}
      <ListGroup className="rounded-0" id="wd-modules">
        {modules
          .filter((m: any) => m.course === cid)
          .map((module: any) => (
            <ListGroup.Item
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title d-flex justify-content-between align-items-center p-3 ps-2 bg-secondary">
                {/* name or editable input */}
                <div>
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && module.name}
                  {module.editing && (
                    <FormControl
                      className="w-50 d-inline-block"
                      autoFocus
                      defaultValue={module.name}
                      onChange={(e) =>
                        dispatch(
                          updateModule({ ...module, name: e.target.value })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(
                            updateModule({ ...module, editing: false })
                          );
                        }
                      }}
                    />
                  )}
                </div>

                {/* pencil / trash */}
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(id) => dispatch(deleteModule(id))}
                  editModule={(id) => dispatch(editModule(id))}
                />
              </div>

              {/* lessons (unchanged) */}
              {module.lessons?.length > 0 && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroup.Item
                      key={lesson._id}
                      className="wd-lesson d-flex justify-content-between align-items-center
                                 p-3 ps-3 border-0 border-start border-start-5 border-success"
                    >
                      {lesson.name}
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
