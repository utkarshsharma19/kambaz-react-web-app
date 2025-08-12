import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import { BsGripVertical } from "react-icons/bs";

import * as modulesClient from "./client";
import * as coursesClient from "../client";

import ModulesControls from "./ModulesControls";
import ModuleEditor from "./ModuleEditor";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";

import {
  addModule,
  deleteModule,
  editModule,
  updateModule,
  setModules,
} from "./reducer";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();

  const dispatch = useDispatch();
  const { modules } = useSelector((state: any) => state.modulesReducer);

  const [moduleName, setModuleName] = useState("");
  const [moduleDesc, setModuleDesc] = useState("");
  const [showModal, setShowModal] = useState(false);

  /* ---------- server helpers ---------- */
  const fetchModules = async () => {
    try {
      if (!cid) return;
      const list = await coursesClient.findModulesForCourse(cid);
      dispatch(setModules(list));
    } catch (err) {
      console.error("fetch modules:", err);
    }
  };

  const createModuleForCourse = async () => {
    if (!cid || !moduleName.trim()) return;
    try {
      const payload = { name: moduleName, description: moduleDesc, course: cid };
      const mod = await coursesClient.createModuleForCourse(cid, payload);
      dispatch(addModule(mod)); // server-created doc
    } catch (err) {
      console.error("create module:", err);
    }
  };

  const saveModule = async (module: any) => {
    try {
      const updated = await modulesClient.updateModule(module);
      dispatch(updateModule(updated));
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

  useEffect(() => {
    fetchModules();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);

  const resetModal = () => {
    setModuleName("");
    setModuleDesc("");
  };

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

      <br />
      <br />
      <br />

      {/* list of modules */}
      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((module: any) => (
          <ListGroup.Item
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            {/* header */}
            <div
              className="wd-title d-flex flex-nowrap justify-content-between align-items-start
                         p-3 ps-2 bg-secondary"
            >
              <div
                className="d-flex align-items-start flex-grow-1"
                style={{ overflowWrap: "anywhere" }}
              >
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

              <div className="flex-shrink-0 ms-3 d-flex align-items-center">
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={removeModule}
                  editModule={(id) => dispatch(editModule(id))}
                  saveModule={saveModule}
                  module={module}
                />
              </div>
            </div>

            {/* lessons (optional) */}
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
