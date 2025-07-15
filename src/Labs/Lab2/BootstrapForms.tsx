import React from "react";
import { Form, Row, Col, InputGroup, Button } from "react-bootstrap";

export default function BootstrapForms() {
  return (
    <>
      {/* Basic inputs */}
      <div id="wd-css-styling-forms" className="mb-4">
        <h2>Forms</h2>
        <Form.Group className="mb-3" controlId="wd-email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="wd-textarea">
          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
      </div>

      {/* Dropdown */}
      <div id="wd-css-styling-dropdowns" className="mb-4">
        <h3>Dropdowns</h3>
        <Form.Select defaultValue="">
          <option value="" disabled>
            Open this select menu
          </option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </Form.Select>
      </div>

      {/* Switches */}
      <div id="wd-css-styling-switches" className="mb-4">
        <h3>Switches</h3>
        <Form.Check type="switch" id="wd-switch-1" label="Unchecked switch" />
        <Form.Check
          type="switch"
          id="wd-switch-2"
          label="Checked switch"
          defaultChecked
        />
        <Form.Check
          type="switch"
          id="wd-switch-disabled-1"
          label="Unchecked disabled"
          disabled
        />
        <Form.Check
          type="switch"
          id="wd-switch-disabled-2"
          label="Checked disabled"
          defaultChecked
          disabled
        />
      </div>

      {/* Range */}
      <div id="wd-css-styling-range-and-sliders" className="mb-4">
        <h3>Range</h3>
        <Form.Group controlId="wd-range1">
          <Form.Label>Example range</Form.Label>
          <Form.Range min={0} max={5} step={0.5} />
        </Form.Group>
      </div>

      {/* Addons */}
      <div id="wd-css-styling-addons" className="mb-4">
        <h3>Addons</h3>
        <InputGroup className="mb-3">
          <InputGroup.Text>$</InputGroup.Text>
          <InputGroup.Text>0.00</InputGroup.Text>
          <Form.Control />
        </InputGroup>
        <InputGroup>
          <Form.Control />
          <InputGroup.Text>$</InputGroup.Text>
          <InputGroup.Text>0.00</InputGroup.Text>
        </InputGroup>
      </div>

      {/* Responsive Form Method 1 */}
      <div id="wd-css-responsive-forms-1" className="mb-4">
        <h3>Responsive forms (method 1)</h3>
        <Form.Group as={Row} className="mb-3" controlId="email1">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" defaultValue="email@example.com" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="password1">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="textarea2">
          <Form.Label column sm={2}>
            Bio
          </Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" style={{ height: "100px" }} />
          </Col>
        </Form.Group>
      </div>

      {/* Responsive Form Method 2 */}
      <div id="wd-css-responsive-forms-2">
        <h3>Responsive forms (method 2)</h3>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="email2">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="email" placeholder="Email" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="password2">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>
          <fieldset>
            <Form.Group as={Row} className="mb-3" controlId="radios">
              <Form.Label as="legend" column sm={2}>
                Radios
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="First radio"
                  name="formHorizontalRadios"
                  id="radio1"
                  defaultChecked
                />
                <Form.Check
                  type="radio"
                  label="Second radio"
                  name="formHorizontalRadios"
                  id="radio2"
                />
                <Form.Check
                  type="radio"
                  label="Third radio"
                  name="formHorizontalRadios"
                  id="radio3"
                />
              </Col>
            </Form.Group>
          </fieldset>
          <Form.Group as={Row} className="mb-3" controlId="rememberMe">
            <Col sm={{ span: 10, offset: 2 }}>
              <Form.Check label="Remember me" />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Sign in</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}
