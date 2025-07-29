import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId: string;
  deleteModule: (id: string) => void;
  editModule:   (id: string) => void;
}) {
  const stop = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="float-end">
      <FaPencil
        className="text-primary me-3"
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          stop(e);
          editModule(moduleId);
        }}
      />
      <FaTrash
        className="text-danger me-2 mb-1"
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          stop(e);
          deleteModule(moduleId);
        }}
      />
      <GreenCheckmark />
      <BsPlus className="fs-1 mx-2" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
