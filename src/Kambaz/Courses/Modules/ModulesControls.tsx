/* ModulesControls.tsx */
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Button, Dropdown } from "react-bootstrap";
import { MdDoNotDisturbAlt } from "react-icons/md";
import GreenCheckmark from "./GreenCheckmark";

export default function ModulesControls({ openModal }: { openModal: () => void }) {
  return (
    <div
      id="wd-modules-controls"
      /*  gap‑2: space between buttons
          d-flex  : flex row container
          align-items-center : vertical‑center buttons
          flex-nowrap : NEVER let items wrap
          overflow-auto : add a thin horiz scrollbar if needed */
      className="d-flex align-items-center gap-2 flex-nowrap overflow-auto"
    >
      {/* Collapse & Progress */}
      <Button variant="secondary" size="lg" className="flex-shrink-0" id="wd-collapse-all">
        Collapse&nbsp;All
      </Button>

      <Button variant="secondary" size="lg" className="flex-shrink-0" id="wd-view-progress">
        View&nbsp;Progress
      </Button>

      {/* Publish dropdown */}
      <Dropdown className="flex-shrink-0">
        <Dropdown.Toggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish&nbsp;All
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item id="wd-publish-all">
            <GreenCheckmark className="me-2" />
            Publish All
          </Dropdown.Item>
          <Dropdown.Item id="wd-publish-all-modules-and-items">
            <GreenCheckmark className="me-2" />
            Publish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-publish-modules-only">
            <GreenCheckmark className="me-2" />
            Publish modules only
          </Dropdown.Item>
          <Dropdown.Item id="wd-unpublish-all-modules-and-items">
            <MdDoNotDisturbAlt className="me-2 text-secondary" />
            Unpublish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-unpublish-modules-only">
            <MdDoNotDisturbAlt className="me-2 text-secondary" />
            Unpublish modules only
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* + Module */}
      <Button
        id="wd-add-module-btn"
        variant="danger"
        size="lg"
        className="flex-shrink-0"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openModal();
        }}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>
    </div>
  );
}
