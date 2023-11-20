import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import TaskForm from "../../components/task/taskForm/TaskForm";
import { createTask, selectIsLoading } from "../../redux/features/task/taskSlice";

const initialState = {
  title: "",
  startDate: "",
  endDate: "",
  department: "",
  status: "",
};

const AddTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [task, setTask] = useState(initialState);
  const [description, setDescription] = useState("");
  const isLoading = useSelector(selectIsLoading);

  const { title, startDate, endDate, department, status } = task;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const saveTask = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("startDate", new Date(startDate));
    formData.append("endDate", new Date(endDate));
    formData.append("department", department);
    formData.append("status", status);
    formData.append("description", description);

    console.log(...formData);

    await dispatch(createTask(formData));

    navigate("/task-dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Add New Task</h3>
      <TaskForm
        task={task}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        saveTask={saveTask}
      />
    </div>
  );
};

export default AddTask;
