export default function Lab1() {
  return (
    <>
      {/* ───────────────────────────── lab header ────────────────────────────── */}
      <div id="wd-lab1">
        <h2>Lab 1 by Utkarsh Sharma</h2>
        <p>
          <a
            href="https://github.com/utkarshsharma19/kambaz-react-web-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here to see my GitHub
          </a>

          <a
            href="https://github.com/utkarshsharma19/kambaz-node-server-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here to see my Backend
          </a>
        </p>

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
            topic it precedes. There are six heading tags – <code>h1</code>{' '}
            through <code>h6</code>. <code>h1</code> is the largest and{' '}
            <code>h6</code> is the smallest.
          </p>
        </section>

        {/* ───────────────────────── paragraph sample ──────────────────────── */}
        <p id="wd-first-paragraph">
          This is the first paragraph. The <code>&lt;p&gt;</code> tag adds
          vertical spacing between blocks of text.
        </p>

        {/* ───────────────────────────── lists ─────────────────────────────── */}
        <section id="wd-lists">
          <h3>List Tags</h3>

          <h4>Ordered List — How to Make Pancakes</h4>
          <ol id="wd-pancakes">
            <li>Mix dry ingredients.</li>
            <li>Add wet ingredients.</li>
            <li>Stir to combine.</li>
            <li>Heat a skillet or griddle.</li>
            <li>Pour batter onto the skillet.</li>
            <li>Cook until bubbly on top.</li>
            <li>Flip and cook the other side.</li>
            <li>Serve and enjoy!</li>
          </ol>

          <h4>Ordered List — My Favorite Recipe</h4>
          <ol id="wd-my-favorite-recipe">
            <li>Chop onions, tomatoes, and cilantro.</li>
            <li>Sauté the onions until translucent.</li>
            <li>Add tomatoes and spices; simmer 10 min.</li>
            <li>Stir in cooked chickpeas.</li>
            <li>Garnish with cilantro and serve hot.</li>
          </ol>

          <h4>Unordered List — My Favorite Books</h4>
          <ul id="wd-my-books">
            <li>Dune</li>
            <li>The Lord of the Rings</li>
            <li>Ender’s Game</li>
            <li>Red Mars</li>
            <li>The Forever War</li>
          </ul>
        </section>

        {/* ────────────────────────── user books ───────────────────────────── */}
        <section>
          <h3>Your Favorite Books (in no particular order)</h3>
          <ul id="wd-your-books">
            <li>1984 — George Orwell</li>
            <li>The Great Gatsby — F. Scott Fitzgerald</li>
            <li>To Kill a Mockingbird — Harper Lee</li>
            <li>The Catcher in the Rye — J. D. Salinger</li>
            <li>Sapiens — Yuval Noah Harari</li>
          </ul>
        </section>

        {/* ──────────────────────── table sample ───────────────────────────── */}
        <section id="wd-tables">
          <h3>Table Tag</h3>
          <table border={1} width="100%">
            <thead>
              <tr>
                <th>Quiz</th>
                <th>Topic</th>
                <th>Date</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {/* rows Q1–Q10 omitted for brevity */}
              <tr>
                <td colSpan={3}>
                  <strong>Average</strong>
                </td>
                <td>
                  <strong>89.9</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* ─────────────────────────── images ──────────────────────────────── */}
        <section id="wd-images">
          <h3>Image Tag</h3>
          <p>Loading an image from the Internet:</p>
          <img
            id="wd-starship"
            src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
            width={400}
            alt="SpaceX Starship on launch pad"
          />
          <p>Loading a local image:</p>
          <img
            id="wd-teslabot"
            src="../../assets/Tesla_Bot_2023.jpg"
            height={200}
            alt="Tesla Bot prototype 2023"
          />
        </section>

        {/* ─────────────────────── form controls ───────────────────────────── */}
        <section id="wd-form-controls">
          <h3>Form Controls</h3>

          {/* text-area */}
          <h4>Text Box</h4>
          <label htmlFor="wd-biography">Biography:</label>
          <br />
          <textarea
            id="wd-biography"
            cols={30}
            rows={10}
            defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit…"
          />

          {/* buttons */}
          <h4>Button</h4>
          <button
            id="wd-all-good"
            type="button"
            onClick={() => alert('Life is Good!')}
          >
            Hello World!
          </button>

          {/* radio buttons */}
          <h4>Radio Buttons</h4>
          <fieldset>
            <legend>Favorite movie genre</legend>
            <input type="radio" id="radio-comedy" name="movie-genre" />
            <label htmlFor="radio-comedy">Comedy</label>
            <br />
            <input type="radio" id="radio-drama" name="movie-genre" />
            <label htmlFor="radio-drama">Drama</label>
            <br />
            <input type="radio" id="radio-scifi" name="movie-genre" />
            <label htmlFor="radio-scifi">Science Fiction</label>
            <br />
            <input type="radio" id="radio-fantasy" name="movie-genre" />
            <label htmlFor="radio-fantasy">Fantasy</label>
          </fieldset>

          {/* checkboxes */}
          <h4>Checkboxes</h4>
          <fieldset>
            <legend>Favorite movie genre (choose any)</legend>
            <input type="checkbox" id="chkbox-comedy" name="chk-genre" />
            <label htmlFor="chkbox-comedy">Comedy</label>
            <br />
            <input type="checkbox" id="chkbox-drama" name="chk-genre" />
            <label htmlFor="chkbox-drama">Drama</label>
            <br />
            <input type="checkbox" id="chkbox-scifi" name="chk-genre" />
            <label htmlFor="chkbox-scifi">Science Fiction</label>
            <br />
            <input type="checkbox" id="chkbox-fantasy" name="chk-genre" />
            <label htmlFor="chkbox-fantasy">Fantasy</label>
          </fieldset>

          {/* select */}
          <h4>Select One</h4>
          <label htmlFor="select-one-genre">Favorite movie genre:</label>
          <br />
          <select id="select-one-genre" defaultValue="SCIFI">
            <option value="COMEDY">Comedy</option>
            <option value="DRAMA">Drama</option>
            <option value="SCIFI">Science Fiction</option>
            <option value="FANTASY">Fantasy</option>
          </select>

          {/* other field types */}
          <h4>Other HTML Field Types</h4>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="jdoe@somewhere.com"
          />
          <br />
          <label htmlFor="salary">Starting salary:</label>
          <input
            type="number"
            id="salary"
            defaultValue={100000}
            placeholder="1000"
          />
          <br />
          <label htmlFor="rating">Rating:</label>
          <input type="range" id="rating" defaultValue={4} max={5} />
          <br />
          <label htmlFor="dob">Date of birth:</label>
          <input type="date" id="dob" defaultValue="2000-01-21" />
        </section>
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
