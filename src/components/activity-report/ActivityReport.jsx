import React from "react";
import { FormDetails } from "../orders/order-form/order-form-details";

const ActivityReport = () => {
  const distanceFormData = {
    employeeName: [
      {
        id: "distance",
        type: "text",
        name: "distance",
        className: "form-control",
        holder: "Employee Name",
        required: false,
      },
    ],
    department: [
      {
        id: "elevation",
        type: "text",
        name: "elevation",
        className: "form-control",
        holder: "Department",
        required: false,
      },
    ],
    week: [
      {
        id: "elevation",
        type: "text",
        name: "elevation",
        className: "form-control",
        holder: "Work week",
        required: false,
      },
    ],
    completedTasks: [
      {
        id: "elevation",
        type: "textarea",
        name: "elevation",
        className: "form-control",
        holder: "Completed Tasks",
        required: false,
      },
    ],
    ongoingTasks: [
      {
        id: "elevation",
        type: "textarea",
        name: "elevation",
        className: "form-control",
        holder: "Ongoing Tasks",
        required: false,
      },
    ],
    nextweekTasks: [
      {
        id: "elevation",
        type: "textarea",
        name: "elevation",
        className: "form-control",
        holder: "Tasks for Next Week",
        required: false,
      },
    ],
    approved: [
      {
        id: "elevation",
        type: "text",
        name: "elevation",
        className: "form-control",
        holder: "Approved by",
        required: false,
      },
    ],
    date: [
      {
        id: "elevation",
        type: "text",
        name: "elevation",
        className: "form-control",
        holder: "Date",
        required: false,
      },
    ],
  };
  return (
    <div
      className="input-group"
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          width: "100%",
        }}
      >
        <span
          style={{
            padding: "1rem 1rem",
            borderRadius: "10px",
            width: "65%",
            backgroundColor: "rgba(235, 237, 242, 0.5)",
          }}
        >
          {distanceFormData.employeeName.map((item, i) => (
            <FormDetails
              displayHalf
              key={i}
              item={item}
              // handleChange={handleChange}
            />
          ))}
        </span>
        <span
          style={{
            padding: "1rem 1rem",
            borderRadius: "10px",
            width: "50%",
            backgroundColor: "rgba(235, 237, 242, 0.5)",
          }}
        >
          {distanceFormData.department.map((item, i) => (
            <FormDetails
              displayHalf
              key={i}
              item={item}
              // handleChange={handleChange}
            />
          ))}
        </span>
        <span
          style={{
            padding: "1rem 1rem",
            borderRadius: "10px",
            width: "50%",
            backgroundColor: "rgba(235, 237, 242, 0.5)",
          }}
        >
          {distanceFormData.week.map((item, i) => (
            <FormDetails
              displayHalf
              key={i}
              item={item}
              // handleChange={handleChange}
            />
          ))}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          width: "100%",
        }}
      >
        <span
          style={{
            padding: "1rem 1rem",
            borderRadius: "10px",
            width: "100%",
            backgroundColor: "rgba(235, 237, 242, 0.5)",
          }}
        >
          {distanceFormData.completedTasks.map((item, i) => (
            <FormDetails
              displayHalf
              key={i}
              item={item}
              rows={10}
              // handleChange={handleChange}
            />
          ))}
        </span>
        <span
          style={{
            padding: "1rem 1rem",
            borderRadius: "10px",
            width: "100%",
            backgroundColor: "rgba(235, 237, 242, 0.5)",
          }}
        >
          {distanceFormData.ongoingTasks.map((item, i) => (
            <FormDetails
              displayHalf
              key={i}
              item={item}
              rows={10}
              // handleChange={handleChange}
            />
          ))}
        </span>
        <span
          style={{
            padding: "1rem 1rem",
            borderRadius: "10px",
            width: "100%",
            backgroundColor: "rgba(235, 237, 242, 0.5)",
          }}
        >
          {distanceFormData.nextweekTasks.map((item, i) => (
            <FormDetails
              displayHalf
              key={i}
              item={item}
              rows={10}
              // handleChange={handleChange}
            />
          ))}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          width: "100%",
        }}
      >
        <span
          style={{
            padding: "1rem 1rem",
            borderRadius: "10px",
            width: "80%",
            backgroundColor: "rgba(235, 237, 242, 0.5)",
          }}
        >
          {distanceFormData.approved.map((item, i) => (
            <FormDetails
              displayHalf
              key={i}
              item={item}
              // handleChange={handleChange}
            />
          ))}
        </span>
        <span
          style={{
            padding: "1rem 1rem",
            borderRadius: "10px",
            width: "50%",
            backgroundColor: "rgba(235, 237, 242, 0.5)",
          }}
        >
          {distanceFormData.date.map((item, i) => (
            <FormDetails
              displayHalf
              key={i}
              item={item}
              // handleChange={handleChange}
            />
          ))}
        </span>
      </div>
    </div>
  );
};

export default ActivityReport;
