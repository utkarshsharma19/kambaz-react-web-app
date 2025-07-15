
import "../Lab2/index.css";
import { Container, Row, Col } from "react-bootstrap";

import BackgroundColors    from "./BackgroundColors";
import Borders             from "./Borders";
import Corners             from "./Corners";
import Dimensions          from "./Dimensions";
import Flex                from "./Flex";
import Float               from "./Float";
import ForegroundColors    from "./ForegroundColors";
import GridLayout          from "./GridLayout";
import Margins             from "./Margins";
import Padding             from "./Padding";
import Position            from "./Positions";
import Zindex              from "./Zindex";

import BootstrapGrids      from "./BootstrapGrids";
import ScreenSizeLabel     from "./ScreenSizeLabel";
import BootstrapTables     from "./BootstrapTables";
import BootstrapLists      from "./BootstrapLists";
import BootstrapForms      from "./BootstrapForms";
import BootstrapNavigation from "./BootstrapNavigation";
import ReactIconsSampler from "./ReactIcons";
import TOC from "../TOC";

export default function Lab2() {
  return (
    <Container>
      {/* SECTION 1: Inline & ID/Class selectors */}
      <h2>Lab 2 - Cascading Style Sheets</h2>

      <h3>Styling with the STYLE attribute</h3>
      <p
        style={{
          backgroundColor: "blue",
          color: "white",
        }}
      >
        Style attribute allows configuring look and feel
        right on the element. Although it's very convenient
        it is considered bad practice and you should avoid
        using the style attribute.
      </p>

      <h3>ID selectors</h3>
      <div id="wd-css-id-selectors">
        <p id="wd-id-selector-1">
          Instead of changing all P tags, we can target a single element by ID.
        </p>
        <p id="wd-id-selector-2">
          Here's another paragraph using a different ID and style.
        </p>
      </div>

      <h3>Class selectors</h3>
      <p className="wd-class-selector">
        Use the CLASS attribute instead of IDs to share styles across elements.
      </p>
      <h4 className="wd-class-selector">
        This heading uses the same class as the paragraph above.
      </h4>

      <h3>Document‑structure selectors</h3>
      <div id="wd-css-document-structure">
        <div className="wd-selector-1">
          <h4>Ancestor + descendant</h4>
          <div className="wd-selector-2">
            <p className="wd-selector-3">
              This paragraph’s red background is styled via
              <br />
              <code>.wd-selector-2 .wd-selector-3</code>
            </p>
            <span className="wd-selector-4">
              This span is a direct child of .wd-selector-2
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 2: Your individual CSS demos */}
      <section style={{ marginTop: "2rem" }}>
        <ForegroundColors />
        <BackgroundColors />
        <Borders />
        <Padding />
        <Margins />
        <Corners />
        <Dimensions />
        <Position />
        <Zindex />
        <Float />
        <GridLayout />
        <Flex />

      </section>

      {/* SECTION 3: Bootstrap examples */}
      <section style={{ marginTop: "2rem" }}>
        <h2>Bootstrap Utilities & Components</h2>

        {/* Manual grid system */}
        <div id="wd-bs-grid-system">
          <h3>Grid system</h3>

          <Row>
            <Col className="bg-danger text-white">
              <h4>Left half</h4>
            </Col>
            <Col className="bg-primary text-white">
              <h4>Right half</h4>
            </Col>
          </Row>

          <Row>
            <Col xs={4} className="bg-warning">
              <h4>One third</h4>
            </Col>
            <Col xs={8} className="bg-success text-white">
              <h4>Two thirds</h4>
            </Col>
          </Row>

          <Row>
            <Col xs={2} className="bg-black text-white">
              <h4>Sidebar</h4>
            </Col>
            <Col xs={8} className="bg-secondary text-white">
              <h4>Main content</h4>
            </Col>
            <Col xs={2} className="bg-info">
              <h4>Sidebar</h4>
            </Col>
          </Row>
        </div>

        {/* Your reusable Bootstrap components */}
        <ReactIconsSampler/>
        <BootstrapGrids />
        <ScreenSizeLabel />
        <BootstrapTables />
        <BootstrapLists />
        <BootstrapForms />
        <BootstrapNavigation/>
        <div>
        <h2>Table of Content:</h2>
        <TOC/>
        </div>

        <div> <h2 className="blue-yellow-heading">Blue on yellow heading</h2>
      <p className="fg-red-white">This is red on white text.</p>
      <p className="fg-green-white">This is green on white text.</p>

      {/* Margin demos */}
      <div className="margin-demo-1">Fat yellow border, blue background, lots of padding</div>
      <div className="margin-demo-2">Fat red border, yellow background, margin-bottom</div>
      <div className="margin-demo-3">Fat blue border, yellow background, centered</div>
      <div className="margin-demo-4">Fat yellow border, blue background, big margins</div>
</div>
        
        
      </section>
    </Container>
  );
}
