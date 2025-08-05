export default function Lab1() {
  return (
    <>
      {/* ───────────────────────────── lab header ────────────────────────────── */}
      <div id="wd-lab1">
        <h2>Lab 1 by Utkarsh Sharma</h2>

        {/* repo links */}
        <p>
          <a
            href="https://github.com/utkarshsharma19/kambaz-react-web-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here to see my GitHub
          </a>{" "}
          <a
            href="https://github.com/utkarshsharma19/kambaz-node-server-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here to see my Backend
          </a>
        </p>

        {/* backend link */}
        <p>
          <a
            href="https://kambaz-node-server-app-r4nl.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            My backend server
          </a>
        </p>

        {/* ─────────────────────── heading-tag sample ─────────────────────── */}
        <section id="wd-heading-tags">
          <h3>Heading Tags</h3>
          <p>
            Text documents are often broken up into sections and subsections.
            Each section is usually prefaced with a heading that summarizes the
            topic it precedes. There are six heading tags – <code>h1</code>{" "}
            through <code>h6</code>. <code>h1</code> is the largest and{" "}
            <code>h6</code> is the smallest.
          </p>
        </section>

        {/* … everything else unchanged … */}
      </div>

      {/* ─────────────── CSS-selector demonstration block ─────────────── */}
      <div id="wd-css-document-structure">
        <div className="wd-selector-1">
          <h3>Document Structure Selectors</h3>
          <div className="wd-selector-2">
            Selectors can be combined to reference elements in particular places
            in the document.
            <p className="wd-selector-3">
              This paragraph’s red background is referenced as:
              <br />
              <code>.selector-2 .selector-3</code>
              <br />
              meaning “descendant of&nbsp;some ancestor.”
              <br />
              <span className="wd-selector-4">
                Whereas this span is a direct child of its parent.
              </span>
              <br />
              You can combine these relationships to create specific styles
              depending on the document structure.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
