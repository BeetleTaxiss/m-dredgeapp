import React from "react";
import Skeleton from "react-loading-skeleton";
import WidgetHeader from "../widget-header";
import CustomTableListBody from "./custom-table-list-body";
import CustomTableListHeader from "./custom-table-list-header";
import { ReactComponent as NoTasks } from "../../../assets/noTasks.svg";
import CustomTablePagination from "../custom-table-paiginaition";
const CustomTableList = ({
  content,
  setLoad,
  filler,
  dropdown,
  change,
  search,
  searchBoxValue,
  searchFields,
  handleSearchList,
  footer,
  ...rest
}) => {
  const arrayContent = Array.isArray(content.body);
  console.log("Body data: ", content);

  return (
    <div className="statbox widget box box-shadow col-md-12">
      <WidgetHeader
        title={content.tableTitle}
        links={content.links}
        dropdown={dropdown ? true : false}
        change={change}
        search={search ? true : false}
        searchBoxValue={searchBoxValue}
        handleSearchList={handleSearchList}
      />
      <div className="widget-content widget-content-area">
        <div className="table-responsive">
          {content?.body[0] === "loading" ? (
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
                {filler && filler}
              </h1>
              <NoTasks
                style={{ width: "25rem", height: "15rem", minWidth: "5rem" }}
              />
            </div>
          ) : (
            <table className="table table-bordered table-hover mb-4">
              <CustomTableListHeader content={content.header} />
              <CustomTableListBody
                content={content.body?.page || content?.body}
                setLoad={setLoad}
              />
            </table>
          )}
        </div>
      </div>
      {footer ? (
        <CustomTablePagination
          currentPageNumber={rest?.currentPageNumber}
          totalPageNumbers={rest?.totalPageNumbers}
          handleNextPagination={rest.handleNextPagination}
          handlePrevPagination={rest.handlePrevPagination}
        />
      ) : null}
    </div>
  );
};

export default CustomTableList;
