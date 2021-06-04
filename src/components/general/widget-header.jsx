import React from "react";
import CustomTableSearchbar from "./custom-table-searchbar";
import TaskAction, { TaskActionArrow } from "./task-action";

const WidgetHeader = ({
  title,
  dropdown,
  links,
  change,
  arrow,
  link,
  paddingTopBottom,
  search,
  searchBoxValue,
  handleSearchList,
}) => {
  return (
    <div
      className="widget-heading dataTables_wrapper container-fluid dt-bootstrap4"
      style={{
        display: "flex",
        justifyContent: "space-between",
        paddingTop: paddingTopBottom && paddingTopBottom,
        paddingBottom: paddingTopBottom && paddingTopBottom,
      }}
    >
      {title?.length > 1 && <h5 className="">{title}</h5>}
      {search && (
        <CustomTableSearchbar
          searchBoxValue={searchBoxValue}
          handleSearchList={handleSearchList}
        />
      )}
      {dropdown ? (
        <TaskAction links={links} change={change ? true : false} />
      ) : null}
      {arrow ? <TaskActionArrow link={link} /> : null}
    </div>
  );
};

export default WidgetHeader;
