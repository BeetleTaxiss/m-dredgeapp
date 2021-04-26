import React from "react";
import Skeleton from "react-loading-skeleton";
import WidgetHeader from "../widget-header";
import CustomTableListBody from "./custom-table-list-body";
import CustomTableListHeader from "./custom-table-list-header";
import { ReactComponent as NoTasks } from "../../../assets/noTasks.svg";
const CustomTableList = ({ content, setLoad }) => {
  console.log("Content: ", content.body);
  const arrayContent = Array.isArray(content.body);
  return (
    <div className="statbox widget box box-shadow col-md-12">
      <WidgetHeader title={content.tableTitle} />
      <div className="widget-content widget-content-area">
        <div className="table-responsive">
          {content.body[0] === "loading" ? (
            <>
              <Skeleton height={35} />
              <Skeleton height={35} />
              <Skeleton height={35} />
              <Skeleton height={35} />
            </>
          ) : arrayContent && content.body.length <= 0 ? (
            <div
              style={{
                display: "grid",
                width: "100%",
                padding: "3rem 0 0",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "#8e99ab",
              }}
            >
              <h1
                style={{
                  color: "#8e99ab",
                  marginBottom: "3rem",
                }}
              >
                No Order to process
              </h1>
              <NoTasks
                style={{ width: "25rem", height: "15rem", minWidth: "5rem" }}
              />
            </div>
          ) : (
            <table className="table table-bordered table-hover mb-4">
              <CustomTableListHeader content={content.header} />
              <CustomTableListBody content={content.body} setLoad={setLoad} />
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomTableList;
