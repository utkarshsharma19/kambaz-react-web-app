import BackgroundColors from "./BackgroundColors";
import Borders from "./Borders";
import ForegroundColors from "./ForegroundColors";
import Margins from "./Margins";
import Padding from "./Padding";

export default function Lab2() {
  return (
    <div id="wd-lab2">
      <h2>Lab 2 – Cascading Style Sheets</h2>

      {/* ─────────── inline-style example ─────────── */}
      <section>
        <h3>Styling with the <code>style</code> attribute</h3>
        <p style={{ color: "crimson", fontWeight: 700 }}>
          This paragraph is styled inline!
        </p>
      </section>

      {/* ─────────── ID-selector demo ─────────── */}
      <section id="wd-css-id-selectors">
        <h3>ID selectors</h3>
        <p id="wd-id-selector-1">
          Instead of changing every&nbsp;<code>&lt;p&gt;</code>, we can target a
          single element by its <code>id</code>.
        </p>
        <p id="wd-id-selector-2">
          Here’s another paragraph with a different ID and look-and-feel.
        </p>
      </section>

      {/* ─────────── class-selector demo ─────────── */}
      <section id="wd-css-class-selectors">
        <h3>Class selectors</h3>

        <p className="wd-class-selector">
          Using a&nbsp;<code>class</code> lets multiple elements share the same
          style.
        </p>

        <h4 className="wd-class-selector">
          This heading reuses that same&nbsp;class.
        </h4>
      </section>

      {/* ─────────── component showcases ─────────── */}
      <section>
        <BackgroundColors />
        <Borders />
        <Margins />
        <Padding />
        <ForegroundColors />
      </section>
    </div>
  );
}
