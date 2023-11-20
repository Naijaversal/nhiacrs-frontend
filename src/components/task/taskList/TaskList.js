import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./TaskList.scss";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_TASKS,
  selectFilteredTasks,
} from "../../../redux/features/task/taskfilterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteTask,
  getTasks,
} from "../../../redux/features/task/taskSlice";
import { Link } from "react-router-dom";
import { ShowOnAdmin, ShowOnUser } from "../../protect/HiddenLink";

const TaskList = ({ tasks, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredTasks = useSelector(selectFilteredTasks);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  function shortenDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const shortDate = new Date(dateString).toLocaleDateString(undefined, options);
  return shortDate;
}



  const delTask = async (id) => {
    console.log(id);
    await dispatch(deleteTask(id));
    await dispatch(getTasks());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Task",
      message: "Are you sure you want to delete this task.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delTask(id),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredTasks.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredTasks.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredTasks]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredTasks.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_TASKS({ tasks, search }));
  }, [tasks, search, dispatch]);

  return (
    <div className="task-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Task List</h3>
          </span>
          <span className="--max-width-35 ">
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && tasks.length === 0 ? (
            <p>-- No tasks found, please add a task...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th className="--center-all">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((task, index) => {
                  const { _id, title, department, status, startDate, endDate } = task;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(title, 40)}</td>
                      <td>{department}</td>
                      <td>{status}</td>
                      <td>{shortenDate(startDate)}</td>
                      <td>{shortenDate(endDate)}</td>
                      <td className="icons">
                        <span className="--center-all">
                          <Link to={`/task-detail/${_id}`}>
                            <button className="--btn --btn-secondary">Details</button>
                          </Link>
                        </span>
                        <span className="--center-all">
                          <Link to={`/edit-task/${_id}`}>
                            <button className="--btn --btn-secondary">Edit</button>
                          </Link>
                        </span>
                        
                        <span className="--center-all">
                          <button
                            className="--btn --btn-danger"
                            onClick={() => confirmDelete(_id)}
                          >
                            Delete
                          </button>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default TaskList;
