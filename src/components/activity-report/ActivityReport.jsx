import axios from "axios";
import moment from "moment";
import React from "react";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../hooks/API";
import { functionUtils } from "../../hooks/function-utils";
import { FormDetails } from "../orders/order-form/order-form-details";
import ActivityReportForm from "./ActivityReportForm";

const ActivityReport = () => {
  // const [] = useState();
  /** Multipurpose success, error and warning pop-ups for handling and displaying errors, success and warning alerts */
  const successAlert = (title, text, link) => {
    Swal.fire({
      icon: "success",
      title: title,
      text: text,
      footer: link,
      showConfirmButton: false,
    });
  };
  const errorAlert = (title, text) => {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      showConfirmButton: false,
    });
  };

  // const warningAlert = (title, releaseItem) => {
  //   Swal.fire({
  //     icon: "warning",
  //     title: title,
  //   }).then((value) => {
  //     if (value.isConfirmed) {
  //       handleReleaseImpoundedTruck(releaseItem);
  //     }
  //   });
  // };

  const handleAddActivityReport = () => {
    const userDetails = JSON.parse(localStorage.getItem("user")),
      user_name = userDetails.username,
      user_id = userDetails.id;
    const work_week = document.getElementById("work-week").value;
    const ongoing_tasks = document.getElementById("ongoing-tasks").value;
    const completed_tasks = document.getElementById("completed-tasks").value;
    const next_week_tasks = document.getElementById("next-week-tasks").value;

    const addActivityReportData = {
      user: user_name,
      "user-id": user_id,
      "work-week": work_week,
      "ongoing-task": ongoing_tasks,
      "next-week-task": next_week_tasks,
      "completed-task": completed_tasks,
    };
    console.log("Add Activity Report API values: ", addActivityReportData);
    axios
      .post(`${BASE_API_URL}/api/v1/task/add.php`, addActivityReportData)
      .then((res) => {
        console.log("Add Activity Report response data: ", res.data);
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
        } else {
          document.getElementById("employee-name").value = "";
          document.getElementById("department").value = "";
          document.getElementById("work-week").value = "";
          document.getElementById("ongoing-tasks").value = "";
          document.getElementById("completed-tasks").value = "";
          document.getElementById("next-week-tasks").value = "";
          // document.getElementById("approved-by").value = "";
          // document.getElementById("date").value = "";

          let title = "Submitted Activity Report Successfully",
            text = res.data.message;
          successAlert(title, text);
        }
      });
  };

  /** Retrive form data for client validation */
  const getAddActivityReportFormDataWrapper = () => {
    const work_week = document.getElementById("work-week").value;
    const ongoing_tasks = document.getElementById("ongoing-tasks").value;
    const completed_tasks = document.getElementById("completed-tasks").value;
    const next_week_tasks = document.getElementById("next-week-tasks").value;

    const addReportData = {
      "work-week": work_week,
      "ongoing-task": ongoing_tasks,
      "next-week-task": next_week_tasks,
      "completed-task": completed_tasks,
    };

    return addReportData;
  };
  /** Get Current week and date */
  let week = moment().format("WW"),
    year = moment().format("YYYY"),
    currentWeek = `${year}-W${week}`;

  console.log("Week: ", currentWeek);
  let date = moment().format("YYYY-MM-DD");
  console.log("Date: ", date);

  const distanceFormData = {
    employeeName: [
      {
        id: "employee-name",
        type: "text",
        name: "employee-name",
        className: "form-control",
        holder: "",
        required: false,
      },
    ],
    department: [
      {
        id: "department",
        type: "text",
        name: "department",
        className: "form-control",
        holder: "",
        required: false,
      },
    ],
    week: [
      {
        id: "work-week",
        type: "week",
        name: "work-week",
        className: "form-control",
        holder: "",
        required: false,
        min: currentWeek,
        // value: currentWeek,
      },
    ],
    completedTasks: [
      {
        id: "completed-tasks",
        type: "textarea",
        name: "completed-tasks",
        className: "form-control",
        holder: "",
        required: false,
      },
    ],
    ongoingTasks: [
      {
        id: "ongoing-tasks",
        type: "textarea",
        name: "ongoing-tasks",
        className: "form-control",
        holder: "",
        required: false,
      },
    ],
    nextweekTasks: [
      {
        id: "next-week-tasks",
        type: "textarea",
        name: "next-week-tasks",
        className: "form-control",
        holder: "",
        required: false,
      },
    ],
    // approved: [
    //   {
    //     id: "approved-by",
    //     type: "text",
    //     name: "approved-by",
    //     className: "form-control",
    //     holder: "",
    //     required: false,
    //   },
    // ],
    // date: [
    //   {
    //     id: "date",
    //     type: "date",
    //     name: "date",
    //     className: "form-control",
    //     holder: "",
    //     min: date,
    //     value: date,
    //     required: false,
    //   },
    // ],
  };
  return (
    <ActivityReportForm
      data={distanceFormData}
      handleSubmit={() => {
        const validation = functionUtils.validateFormInputs(
          getAddActivityReportFormDataWrapper()
        );
        if (validation === true) {
          handleAddActivityReport();
        }
      }}
    />
  );
};

export default ActivityReport;
