export default function AssignmentEditor() {
  return (
    <form id="wd-assignment-editor">
      <div className="field">
        <label htmlFor="wd-name">Assignment Name</label><br />
        <input
          type="text"
          id="wd-name"
          name="wd-name"
          placeholder="Enter assignment name"
        />
      </div>

      <div className="field">
        <label htmlFor="wd-description">Description</label><br />
        <textarea
          id="wd-description"
          name="wd-description"
          rows={4}
          placeholder="Enter description"
        />
      </div>

      <div className="field">
        <label htmlFor="wd-points">Points</label><br />
        <input
          type="number"
          id="wd-points"
          name="wd-points"
          placeholder="0"
        />
      </div>

      <div className="field">
        <label htmlFor="wd-group">Assignment Group</label><br />
        <select id="wd-group" name="wd-group">
          <option value="assignment">Assignment</option>
          <option value="quiz">Quiz</option>
          <option value="exam">Exam</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="wd-display-grade">Display Grade</label><br />
        <select id="wd-display-grade" name="wd-display-grade">
          <option value="percentage">Percentage</option>
          <option value="grade">Grade</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="wd-submission-type">Submission Type</label><br />
        <select id="wd-submission-type" name="wd-submission-type">
          <option value="online">Online</option>
          <option value="onsite">Onsite</option>
        </select>
      </div>

      <fieldset id="wd-online-options">
        <legend>Online entry options</legend>
        <label>
          <input type="checkbox" name="text-entry" /> Text Entry
        </label><br />
        <label>
          <input type="checkbox" name="website-url" /> Website URL
        </label><br />
        <label>
          <input type="checkbox" name="media-recordings" /> Media Recordings
        </label><br />
        <label>
          <input type="checkbox" name="student-annotation" /> Student Annotation
        </label><br />
        <label>
          <input type="checkbox" name="file-upload" /> File Upload
        </label>
      </fieldset>

      <div className="field">
        <label htmlFor="wd-assign-to">Assign To</label><br />
        <select id="wd-assign-to" name="wd-assign-to">
          <option value="Utkarsh">Utkarsh</option>
          <option value="everyone">Everyone</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="wd-due-date">Due Date</label><br />
        <input
          type="date"
          id="wd-due-date"
          name="wd-due-date"
          value="2025-07-14"
        />
      </div>

      <div className="field">
        <label htmlFor="wd-available-from">Available From</label><br />
        <input
          type="date"
          id="wd-available-from"
          name="wd-available-from"
          value="2025-07-14"
        />
      </div>

      <div className="field">
        <label htmlFor="wd-available-until">Available Until</label><br />
        <input
          type="date"
          id="wd-available-until"
          name="wd-available-until"
          value="2025-07-21"
        />
      </div>

      <div className="field">
        <button type="submit">Save Assignment</button>
      </div>
    </form>
  );
}
