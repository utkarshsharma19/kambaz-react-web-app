/*  src/Kambaz/Courses/Modules/index.tsx  */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ListGroup   from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import { BsGripVertical } from "react-icons/bs";

import * as modulesClient from "./client";
import * as coursesClient from "../client";

import ModulesControls     from "./ModulesControls";
import ModuleEditor        from "./ModuleEditor";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

import {
  addModule, deleteModule, editModule,
  updateModule, setModules
} from "./reducer";

/* ------------------------------------------------------------------ */

export default function Modules() {
  /* URL */
  const { cid } = useParams<{ cid: string }>();

  /* Redux */
  const dispatch = useDispatch();
  const { modules } = useSelector((state: any) => state.modulesReducer);

  /* modal state */
  const [moduleName, setModuleName] = useState("");
  const [moduleDesc, setModuleDesc] = useState("");
  const [showModal, setShowModal]   = useState(false);

  /* ─────────── server helpers ─────────── */

  const fetchModules = async () => {
    try {
      const list = await coursesClient.findModulesForCourse(cid as string);
      dispatch(setModules(list));
    } catch (err) {
      console.error("fetch modules:", err);
    }
  };

  const createModuleForCourse = async () => {
    if (!cid) return;
    try {
      const payload = { name: moduleName, description: moduleDesc, course: cid };
      const module  = await coursesClient.createModuleForCourse(cid, payload);
      dispatch(addModule(module));
    } catch (err) {
      console.error("create module:", err);
    }
  };

  const saveModule = async (module: any) => {
    try {
      const saved = await modulesClient.updateModule(module);
      dispatch(updateModule(saved));
    } catch (err) {
      console.error("update module:", err);
    }
  };

  const removeModule = async (moduleId: string) => {
    try {
      await modulesClient.deleteModule(moduleId);
      dispatch(deleteModule(moduleId));
    } catch (err) {
      console.error("delete module:", err);
    }
  };

  useEffect(() => { fetchModules(); }, [cid]);

  /* modal helpers */
  const resetModal = () => {
    setModuleName("");
    setModuleDesc("");
  };

  /* ------------------------------------------------------------------ */

  return (
    <div className="wd-modules">
      {/* toolbar */}
      <ModulesControls openModal={() => setShowModal(true)} />

      {/* modal */}
      <ModuleEditor
        show={showModal}
        handleClose={() => {
          resetModal();
          setShowModal(false);
        }}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        moduleDesc={moduleDesc}
        setModuleDesc={setModuleDesc}
        addModule={() => {
          createModuleForCourse();
          resetModal();
          setShowModal(false);
        }}
      />

      <br /><br /><br />

      {/* list of modules */}
      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((module: any) => (
          <ListGroup.Item
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            {/* ─── header row ─────────────────────────────── */}
            <div
              className="wd-title d-flex flex-nowrap justify-content-between align-items-start
                         p-3 ps-2 bg-secondary"
            >
              {/* left: drag handle + title */}
              <div className="d-flex align-items-start flex-grow-1" style={{ overflowWrap: "anywhere" }}>
                <BsGripVertical className="me-2 fs-3 flex-shrink-0" />

                {!module.editing && (
                  <>
                    <strong>{module.name}</strong>
                    {module.description?.trim() && (
                      <span className="text-muted fst-italic ms-3">
                        — {module.description}
                      </span>
                    )}
                  </>
                )}

                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    autoFocus
                    defaultValue={module.name}
                    onChange={(e) =>
                      dispatch(updateModule({ ...module, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveModule({ ...module, editing: false });
                      }
                    }}
                  />
                )}
              </div>

              {/* right: icon buttons */}
              <div className="flex-shrink-0 ms-3 d-flex align-items-center">
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={removeModule}          /* server + store */
                  editModule={(id) => dispatch(editModule(id))}
                  saveModule={saveModule}              /* optional “save” button */
                  module={module}
                />
              </div>
            </div>

            {/* lessons */}
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
