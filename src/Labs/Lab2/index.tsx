export default function Lab2() {
  const showAlert = () => {
    alert("Form Submitted!");
  };

  return (
    <div>
      <h2>Lab 2</h2>
      <form id="wd-lab2-form">
        <label htmlFor="username">Username:</label><br />
        <input type="text" id="username" name="username" /><br /><br />

        <label htmlFor="password">Password:</label><br />
        <input type="password" id="password" name="password" /><br /><br />

        <label htmlFor="firstname">First Name:</label><br />
        <input type="text" id="firstname" name="firstname" /><br /><br />

        <label htmlFor="lastname">Last Name:</label><br />
        <input type="text" id="lastname" name="lastname" /><br /><br />

        <label htmlFor="textarea">About You:</label><br />
        <textarea id="textarea" name="textarea" rows={4} cols={30}></textarea><br /><br />

        <label htmlFor="fileUpload">Upload File:</label><br />
        <input type="file" id="fileUpload" name="fileUpload" /><br /><br />

        <fieldset>
          <legend>Favorite Genre (Radio):</legend>
          <input type="radio" id="comedyRadio" name="genre" value="comedy" />
          <label htmlFor="comedyRadio">Comedy</label><br />

          <input type="radio" id="dramaRadio" name="genre" value="drama" />
          <label htmlFor="dramaRadio">Drama</label><br />

          <input type="radio" id="scifiRadio" name="genre" value="scifi" />
          <label htmlFor="scifiRadio">SciFi</label><br />

          <input type="radio" id="fantasyRadio" name="genre" value="fantasy" />
          <label htmlFor="fantasyRadio">Fantasy</label><br />
        </fieldset><br />

        <fieldset>
          <legend>Favorite Genres (Checkboxes):</legend>
          <input type="checkbox" id="comedyCheckbox" name="genres" value="comedy" />
          <label htmlFor="comedyCheckbox">Comedy</label><br />

          <input type="checkbox" id="dramaCheckbox" name="genres" value="drama" />
          <label htmlFor="dramaCheckbox">Drama</label><br />

          <input type="checkbox" id="scifiCheckbox" name="genres" value="scifi" />
          <label htmlFor="scifiCheckbox">SciFi</label><br />

          <input type="checkbox" id="fantasyCheckbox" name="genres" value="fantasy" />
          <label htmlFor="fantasyCheckbox">Fantasy</label><br />
        </fieldset><br />

        <label htmlFor="selectOne">Select One Option:</label><br />
        <select id="selectOne" name="selectOne">
          <option value="opt1">Option 1</option>
          <option value="opt2">Option 2</option>
          <option value="opt3">Option 3</option>
        </select><br /><br />

        <label htmlFor="selectMany">Select Many Options:</label><br />
        <select id="selectMany" name="selectMany" multiple>
          <option value="multi1">Multiple 1</option>
          <option value="multi2">Multiple 2</option>
          <option value="multi3">Multiple 3</option>
        </select><br /><br />

        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" /><br /><br />

        <label htmlFor="salary">Salary:</label><br />
        <input type="number" id="salary" name="salary" /><br /><br />

        <label htmlFor="rating">Rating:</label><br />
        <input type="range" id="rating" name="rating" min="1" max="5" /><br /><br />

        <label htmlFor="dob">Date of Birth:</label><br />
        <input type="date" id="dob" name="dob" /><br /><br />

        <button type="button" onClick={showAlert}>Submit</button><br /><br />

        <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
          Go to Google
        </a>
      </form>
    </div>
  );
}
