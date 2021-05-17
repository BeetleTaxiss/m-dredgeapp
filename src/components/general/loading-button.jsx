import React from "react";

const LoadingButton = ({
  handleSubmit,
  loading,
  text,
  setLoad,
  extraClass,
}) => {
  return (
    <button
      id="loading-btn"
      onClick={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className={`mt-4 btn btn-primary ${extraClass && extraClass}`}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
      }}
    >
      {loading ? (
        <>
          <span className="spinner-grow text-white mr-2 align-self-center loader-sm" />
          {/* </span> */}
          Loading...
        </>
      ) : (
        <>{text}</>
      )}
    </button>
  );
};

export default LoadingButton;
