import React from "react";
import { FaPlus } from "react-icons/fa6";
import { Button, Dropdown } from "react-bootstrap";
import { MdDoNotDisturbAlt } from "react-icons/md";
import GreenCheckmark from "./GreenCheckmark";

export default function ModulesControls({
  openModal,
}: {
  openModal: () => void;
}) {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      {/* Collapse & Progress buttons (omitted) */}
      <Button variant="secondary" size="lg" className="me-2 text-dark" id="wd-collapse-all">
        Collapse All
      </Button>
      <Button variant="secondary" size="lg" className="me-4 text-dark" id="wd-view-progress">
        View Progress
      </Button>

      {/* Publish dropdown (omitted) */}
      <Dropdown className="float-end me-2">
        <Dropdown.Toggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {/* ...items omitted for brevity */}
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
        className="me-1 float-end"
        type="button"
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
