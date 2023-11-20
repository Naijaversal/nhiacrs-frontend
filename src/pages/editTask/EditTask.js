import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import TaskForm from "../../components/task/taskForm/TaskForm";

import {
  getTask,
  getTasks,
  selectIsLoading,
  selectTask,
  updateTask,
} from "../../redux/features/task/taskSlice";

const EditTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);

  const taskEdit = useSelector(selectTask);
  

  const [task, setTask] = useState(taskEdit);
  const [description, setDescription] = useState("");

  const startDate = taskEdit?.startDate;
  const endDate = taskEdit?.endDate;

  useEffect(() => {
    dispatch(getTask(id));
  }, [startDate, endDate, dispatch, id]);

  useEffect(() => {
    setTask(taskEdit);

    // Initialize the description state with the existing description
    setDescription(
      taskEdit && taskEdit.description ? taskEdit.description : ""
    );
  }, [taskEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const saveTask = async (e) => {
    e.preventDefault();
    const formData = {
      title: task?.title,
      startDate: task?.startDate,
      endDate: task?.endDate,
      department: task?.department,
      status: task?.status,
      description: task?.description,
    };

    await dispatch(updateTask({ id, formData }));
    await dispatch(getTasks());
    navigate("/task-dashboard");
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Task</h3>
      <TaskForm
        task={task}
        handleInputChange={handleInputChange}
        description={description}
        setDescription={setDescription}
        startDate={startDate}
        endDate={endDate}
        saveTask={saveTask}
      />
    </div>
  );
};

export default EditTask;
