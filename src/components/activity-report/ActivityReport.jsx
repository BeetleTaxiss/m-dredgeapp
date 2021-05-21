import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../hooks/API";
import { functionUtils, useGetUserDetails } from "../../hooks/function-utils";
import ActivityReportForm from "./ActivityReportForm";

const ActivityReport = () => {
  const [userName, setUserName] = useState();
  const [userId, setUserId] = useState();
  const [userType, setUserType] = useState();
  const [loading, setLoading] = useState(false);

  /** Get user data from user store with custom hook and subscribe the state values to a useEffect to ensure delayed async fetch is accounted for  */
  useGetUserDetails(setUserName, setUserId, setUserType);

  useEffect(() => {
    document.getElementById("employee-name").value = userName;
    document.getElementById("department").value =
      userType === "2"
        ? "Super Admin"
        : userType === "3"
        ? "Admin"
        : userType === "4"
        ? "Loader"
        : userType === "5"
        ? "Production Master"
        : userType === "6"
        ? "Loading Inspector"
        : userType === "7"
        ? "Security"
        : userType === "8"
        ? "Operation Staff"
        : "Staff";
  }, [userName, userId, userType]);

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

  const handleAddActivityReport = (userName, userId) => {
    const work_week = document.getElementById("work-week").value;
    const ongoing_tasks = document.getElementById("ongoing-tasks").value;
    const completed_tasks = document.getElementById("completed-tasks").value;
    const next_week_tasks = document.getElementById("next-week-tasks").value;

    const addActivityReportData = {
      user: userName,
      "user-id": userId,
      "work-week": work_week,
      "ongoing-task": ongoing_tasks,
      "next-week-task": next_week_tasks,
      "completed-task": completed_tasks,
    };

    axios
      .post(`${BASE_API_URL}/api/v1/task/add.php`, addActivityReportData)
      .then((res) => {
        if (res.data.error) {
          let title = "Server Error Response",
            text = res.data.message;
          errorAlert(title, text);
          setLoading(false);
        } else {
          document.getElementById("work-week").value = "";
          document.getElementById("ongoing-tasks").value = "";
          document.getElementById("completed-tasks").value = "";
          document.getElementById("next-week-tasks").value = "";
          // document.getElementById("approved-by").value = "";
          // document.getElementById("date").value = "";

          let title = "Submitted Activity Report Successfully",
            text = res.data.message;
          successAlert(title, text);
          setLoading(false);
        }
      })
      .catch((error) => {
        errorAlert("Network Error", error);
        setLoading(false);
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

  let date = moment().format("YYYY-MM-DD");

  const distanceFormData = {
    employeeName: [
      {
        id: "employee-name",
        type: "text",
        name: "employee-name",
        className: "form-control",
        holder: "",
        disabled: true,
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
        disabled: true,
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
      loading={loading}
      handleSubmit={() => {
        const validation = functionUtils.validateFormInputs(
          getAddActivityReportFormDataWrapper()
        );
        if (validation === true) {
          setLoading(true);
          handleAddActivityReport(userName, userId);
        }
      }}
    />
  );
};

export default ActivityReport;
