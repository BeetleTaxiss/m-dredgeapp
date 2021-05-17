import React from "react";
import LoadingButton from "../general/loading-button";
import { FormDetails } from "../orders/order-form/order-form-details";

const ActivityReportForm = ({ data, handleSubmit, loading }) => {
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
          <label
            className="input-label"
            htmlFor="from"
            style={{
              width: "45%",
              fontWeight: "bold",
            }}
          >
            Employee Name:
          </label>
          {data.employeeName.map((item, i) => (
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
          <label
            className="input-label"
            htmlFor="from"
            style={{
              width: "45%",
              fontWeight: "bold",
            }}
          >
            Department:
          </label>
          {data.department.map((item, i) => (
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
          <label
            className="input-label"
            htmlFor="from"
            style={{
              width: "45%",
              fontWeight: "bold",
            }}
          >
            Work week:
          </label>
          {data.week.map((item, i) => (
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
          <label
            className="input-label"
            htmlFor="from"
            style={{
              width: "45%",
              fontWeight: "bold",
            }}
          >
            Completed Tasks:
          </label>
          {data.completedTasks.map((item, i) => (
            <FormDetails
              displayHalf
              key={i}
              item={item}
              rows={10}
              noMB
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
          <label
            className="input-label"
            htmlFor="from"
            style={{
              width: "45%",
              fontWeight: "bold",
            }}
          >
            Ongoing Tasks:
          </label>
          {data.ongoingTasks.map((item, i) => (
            <FormDetails
              displayHalf
              key={i}
              item={item}
              rows={10}
              noMB
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
          <label
            className="input-label"
            htmlFor="from"
            style={{
              width: "45%",
              fontWeight: "bold",
            }}
          >
            Tasks for next week:
          </label>
          {data.nextweekTasks.map((item, i) => (
            <FormDetails
              displayHalf
              key={i}
              item={item}
              rows={10}
              noMB
              // handleChange={handleChange}
            />
          ))}
        </span>
      </div>
      {/* <div
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
          <label
            className="input-label"
            htmlFor="from"
            style={{
              width: "45%",
              fontWeight: "bold",
            }}
          >
            Approved by:
          </label>
          {data.approved.map((item, i) => (
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
          <label
            className="input-label"
            htmlFor="from"
            style={{
              width: "45%",
              fontWeight: "bold",
            }}
          >
            Date:
          </label>
          {data.date.map((item, i) => (
            <FormDetails
              displayHalf
              key={i}
              item={item}
              // handleChange={handleChange}
            />
          ))}
        </span>
      </div> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          width: "100%",
          marginBottom: "4rem",
        }}
      >
        <LoadingButton
          handleSubmit={handleSubmit}
          loading={loading}
          text="Submit Report"
          extraClass="activity-report-loading-btn"
        />
      </div>
    </div>
  );
};

export default ActivityReportForm;
