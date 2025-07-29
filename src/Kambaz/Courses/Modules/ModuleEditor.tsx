import { Modal, FormControl, Button, Form } from "react-bootstrap";

interface Props {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  moduleName: string;
  setModuleName: (name: string) => void;
  moduleDesc: string;
  setModuleDesc: (desc: string) => void;
  addModule: () => void;
}

export default function ModuleEditor({
  show,
  handleClose,
  dialogTitle,
  moduleName,
  setModuleName,
  moduleDesc,
  setModuleDesc,
  addModule,
}: Props) {
  const submit = () => {
    if (!moduleName.trim()) return;
    addModule();
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Name */}
        <Form.Group className="mb-3" controlId="module-name">
          <Form.Label>Name</Form.Label>
          <FormControl
            autoFocus
            value={moduleName}
            placeholder="Module name"
            onChange={(e) => setModuleName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") submit();
            }}
          />
        </Form.Group>

        {/* Description */}
        <Form.Group controlId="module-desc">
          <Form.Label>Description</Form.Label>
          <FormControl
            as="textarea"
            rows={3}
            value={moduleDesc}
            placeholder="Brief description (optional)"
            onChange={(e) => setModuleDesc(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          disabled={!moduleName.trim()}
          onClick={submit}
        >
          Add Module
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
