import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";

export default function Modules() {
  return (
    <div>
      <ModulesControls />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        {/* Week 1 */}
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title d-flex justify-content-between align-items-center p-3 ps-2 bg-secondary">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              Week 1
            </div>
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson d-flex justify-content-between align-items-center p-3 ps-1">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson d-flex justify-content-between align-items-center p-3 ps-1">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                Introduction to the course
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson d-flex justify-content-between align-items-center p-3 ps-1">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                Learn what is Web Development
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>

        {/* Week 2 */}
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title d-flex justify-content-between align-items-center p-3 ps-2 bg-secondary">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              Week 2
            </div>
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson d-flex justify-content-between align-items-center p-3 ps-1">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                HTML BASICS
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson d-flex justify-content-between align-items-center p-3 ps-1">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                HTML Tags
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson d-flex justify-content-between align-items-center p-3 ps-1">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                Headings and Paragraphs
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson d-flex justify-content-between align-items-center p-3 ps-1">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                Lists: Ordered and Unordered
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>

        {/* Week 3 */}
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title d-flex justify-content-between align-items-center p-3 ps-2 bg-secondary">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              Week 3
            </div>
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson d-flex justify-content-between align-items-center p-3 ps-1">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                ADVANCED HTML
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson d-flex justify-content-between align-items-center p-3 ps-1">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                Tables and Forms
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson d-flex justify-content-between align-items-center p-3 ps-1">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                Semantic Elements
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson d-flex justify-content-between align-items-center p-3 ps-1">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                Embedding Images and Videos
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>

        {/* Week 4 */}
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title d-flex justify-content-between align-items-center p-3 ps-2 bg-secondary">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              Week 4
            </div>
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson d-flex justify-content-between align-items-center p-3 ps-1">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                CSS INTRO
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson d-flex justify-content-between align-items-center p-3 ps-1">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                CSS Selectors
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson d-flex justify-content-between align-items-center p-3 ps-1">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                Colors and Fonts
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson d-flex justify-content-between align-items-center p-3 ps-1">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                Box Model
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>

        {/* Week 5 */}
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title d-flex justify-content-between align-items-center p-3 ps-2 bg-secondary">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              Week 5
            </div>
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson d-flex justify-content-between align-items-center p-3 ps-1">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                ADVANCED CSS
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson d-flex justify-content-between align-items-center p-3 ps-1">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                Flexbox
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson d-flex justify-content-between align-items-center p-3 ps-1">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                Grid Layout
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson d-flex justify-content-between align-items-center p-3 ps-1">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                Media Queries
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
