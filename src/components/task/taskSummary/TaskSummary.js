import React, { useEffect } from "react";
import "./TaskSummary.scss";
import { BsCardChecklist, BsListCheck, BsCheck, BsX } from "react-icons/bs";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_TASK_STATUS,
  selectTaskStatus,
  selectAllTasks,
} from "../../../redux/features/task/taskSlice";

// Icons
const taskIcon = <BsCardChecklist size={40} color="#fff" />;
const toDoIcon = <BsListCheck size={40} color="#fff" />;
const doneIcon = <BsCheck size={40} color="#fff" />;
const notDoneIcon = <BsX size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const TaskSummary = () => {
  const dispatch = useDispatch();
  const taskStatus = useSelector(selectTaskStatus);
  const allTasks = useSelector(selectAllTasks);
  

  useEffect(() => {
    dispatch(CALC_TASK_STATUS(allTasks));
  }, [dispatch, allTasks]);

  return (
    <div className="task-summary">
      <h3 className="--mt">Task Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={taskIcon}
          title={"Total Tasks"}
          count={allTasks.length}
          bgColor="card4"
        />
        <InfoBox
          icon={toDoIcon}
          title={"To Do"}
          count={taskStatus.toDo}
          bgColor="card2"
        />
        <InfoBox
          icon={doneIcon}
          title={"Completed"}
          count={taskStatus.done}
          bgColor="card1"
        />
        <InfoBox
          icon={notDoneIcon}
          title={"Not Completed"}
          count={taskStatus.notDone}
          bgColor="card3"
        />
      </div>
    </div>
  );
};

export default TaskSummary;
