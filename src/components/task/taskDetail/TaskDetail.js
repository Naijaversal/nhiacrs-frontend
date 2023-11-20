import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getTask } from "../../../redux/features/task/taskSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./TaskDetail.scss";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";

const TaskDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { task, isLoading, isError, message } = useSelector(
    (state) => state.task
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getTask(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch, id]);

  return (
    <div className="task-detail">
      <h3 className="--mt">Task Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {task && (
          <div className="detail">
            <h4>
              <span className="badge">Title: </span> &nbsp; {task.title}
            </h4>
            <p>
              <b>&rarr; Start Date: </b> {new Date(task.startDate).toDateString()}
            </p>
            <p>
              <b>&rarr; End Date: </b> {new Date(task.endDate).toDateString()}
            </p>
            <p>
              <b>&rarr; Department: </b> {task.department}
            </p>
            <p>
              <b>&rarr; Status: </b> {task.status}
            </p>
            <hr />
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(task.description),
              }}
            ></div>
            <hr className="description-set" />
            <code className="--color-success">
              Created on: {new Date(task.createdAt).toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-success">
              Last Updated: {new Date(task.updatedAt).toLocaleString("en-US")}
            </code>
            <Link to={`/task-dashboard`}>
              <button className="--btn --btn-primary">Back</button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TaskDetail;
