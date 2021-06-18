import React from "react";

export const NotificationsWarning = ({ text, icon, color, showClose }) => {
  return (
    <div>
      <div
        className={`alert ${
          icon && "alert-icon-left"
        } alert-light-${color} mb-4`}
        role="alert"
      >
        {showClose && (
          <button
            type="button"
            className="close"
            dataDismiss="alert"
            ariaLabel="Close"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              dataDismiss="alert"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-x close"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
        {icon}
        {text}
      </div>
    </div>
  );
};

export const NotificationsPrimary = ({ text, icon, color, showClose }) => {
  return (
    <div>
      <div
        class={`alert ${
          icon && "alert-arrow-left  alert-icon-left"
        } alert-light-${color} mb-4`}
        role="alert"
      >
        {showClose && (
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-dismiss="alert"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-x close"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}

        {icon}

        {text}
      </div>
    </div>
  );
};

const CoverTest = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "3rem",
      }}
    >
      <NotificationsPrimary
        text="New notifications here!"
        // Warning icon
        // icon={
        //   <svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     width="24"
        //     height="24"
        //     viewBox="0 0 24 24"
        //     fill="none"
        //     stroke="currentColor"
        //     strokeWidth="2"
        //     strokeLinecap="round"
        //     strokeLinejoin="round"
        //     className="feather feather-alert-triangle"
        //   >
        //     <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        //     <line x1="12" y1="9" x2="12" y2="13"></line>
        //     <line x1="12" y1="17" x2="12" y2="17"></line>
        //   </svg>
        // }

        //  Bell Icon
        //  icon={
        //   <svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     width="24"
        //     height="24"
        //     viewBox="0 0 24 24"
        //     fill="none"
        //     stroke="currentColor"
        //     strokeWidth="2"
        //     strokeLinecap="round"
        //     strokeLinejoin="round"
        //     class="feather feather-bell"
        //   >
        //     <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        //     <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        //   </svg>
        // }
        color="primary"
      />
    </div>
  );
};

export default CoverTest;
