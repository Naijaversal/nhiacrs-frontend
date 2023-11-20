import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import "./TaskForm.scss";
import { Link } from "react-router-dom";





const TaskForm = ({
  task,
  description,
  setDescription,
  handleInputChange,
  saveTask,
}) => {
  return (
    <div className="add-task">
      <Card cardClass={"card"}>
        <form onSubmit={saveTask}>
          <label>Title:</label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={task?.title}
            onChange={handleInputChange}
          />

          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={task?.startDate}
            onChange={handleInputChange}
          />

          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={task?.endDate}
            onChange={handleInputChange}
          />

          <label>Department:</label>
          <select
            name="department"
            value={task?.department}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select a department
            </option>
            <option value="Finance and Admin">Finance and Admin</option>
            <option value="Programmes">Programmes</option>
            <option value="SQA">SQA</option>
            <option value="Accounts">Accounts</option>
            <option value="Media and Publicity">Media and Publicity</option>
            <option value="Reconciliation">Reconciliation</option>
            <option value="State Coordinator">State Coordinator</option>
          </select>

          <label>Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={TaskForm.modules}
            formats={TaskForm.formats}
          />

          <label>Status:</label>
          <select
            name="status"
            value={task?.status}
            onChange={handleInputChange}
            required
          >
          <option value="" disabled>
              Select status
            </option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
            <option value="Not Done">Not Done</option>
          </select>

          <div className="--my">
            <button type="submit" className="--btn --btn-success">
              Save Task
            </button>
          </div>
          <div className="--my">
          <Link to={`/task-dashboard`}>
              <button className="--btn --btn-secondary">Back</button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

TaskForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
TaskForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default TaskForm;
