import React from "react";
import WidgetHeader from "../widget-header";
import CustomTableListBody from "./custom-table-list-body";
import CustomTableListHeader from "./custom-table-list-header";
const CustomTableList = ({ content, setLoad }) => {
  return (
    <div className="statbox widget box box-shadow col-md-12">
      <WidgetHeader title={content.tableTitle} />
      <div className="widget-content widget-content-area">
        <div className="table-responsive">
          <table className="table table-bordered table-hover mb-4">
            <CustomTableListHeader content={content.header} />
            <CustomTableListBody content={content.body} setLoad={setLoad} />
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomTableList;
