import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { Button, Dropdown } from "react-bootstrap";
import { MdDoNotDisturbAlt } from "react-icons/md";

export default function ModulesControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      
      <Button
        id="wd-collapse-all"
        variant="secondary"
        size="lg"
        className="me-2 text-dark"
        style={{ backgroundColor: "grey", borderColor: "grey" }}
      >
        Collapse All
      </Button>
      <Button
        id="wd-view-progress"
        variant="secondary"
        size="lg"
        className="me-4 text-dark"
        style={{ backgroundColor: "grey", borderColor: "grey" }}
      >
        View Progress
      </Button>

      {/* Publish dropdown */}
      <Dropdown className="float-end me-2">
        <Dropdown.Toggle
          variant="secondary"
          size="lg"
          id="wd-publish-all-btn"
        >
          <GreenCheckmark /> Publish All
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item id="wd-publish-all">
            <GreenCheckmark /> Publish All
          </Dropdown.Item>
          <Dropdown.Item id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
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

      {/* Add Module */}
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        id="wd-add-module-btn"
      >
        <FaPlus
          className="position-relative me-2"
          style={{ bottom: "1px" }}
        />
        Module
      </Button>
    </div>
  );
}
