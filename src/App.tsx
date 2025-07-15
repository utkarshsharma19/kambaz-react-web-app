
import Kambaz from "./Kambaz/index";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import './App.css'
import Labs from './Labs/index'
import AssignmentEditor from './Kambaz/Courses/Assignments/Editor';
// import Button from 'react-bootstrap/Button';

function App() {
  // return <Button variant="primary">Hello Bootstrap</Button>;
  return (
    <HashRouter>
    <Routes>
    <Route path="/" element={<Navigate to="Kambaz" />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kambaz/*" element={<Kambaz />} />
          <Route path="/editor/:assignmentId" element={<AssignmentEditor />} />
        </Routes>
  </HashRouter>
  
  )
}

export default App
