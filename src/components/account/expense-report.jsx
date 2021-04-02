import React from "react";
import ExpenseReportTablehead from "./expense-report-tablehead";
import ExpenseReportTablebody from "./expense-report-body";
import ExpenseReportTablefooter from "./expense-report-tablefooter";
import ViewordersSearchbar from "./expense-report-searchbar";
import ExpenseReportTablepaiginaition from "./expense-report-tablepaiginaition";

/**
 * Expense Report Data structure
 */
const expenseReportData = {
  tableHeader: [
    {
      text: "Expenses",
      className: "sorting",
      ariaLabel: "Name: activate to sort column ascending",
      // ariaSort: "descending",
      width: "110px",
    },
    {
      text: "Description",
      className: "sorting",
      ariaLabel: "Position: activate to sort column ascending",
      // ariaSort: "descending",
      width: "87px",
    },
    {
      text: "Amount",
      className: "sorting",
      ariaLabel: "Office: activate to sort column ascending",
      // ariaSort: "descending",
      width: "78px",
    },
    {
      text: "Issuer",
      className: "sorting_desc",
      ariaLabel: "Age: activate to sort column ascending",
      ariaSort: "descending",
      width: "31px",
    },
    {
      text: "Date",
      className: "sorting",
      ariaLabel: "Start date: activate to sort column ascending",
      // ariaSort: "descending",
      width: "81px",
    },
    {
      text: "Serial No",
      className: "sorting",
      ariaLabel: "Salary: activate to sort column ascending",
      // ariaSort: "descending",
      width: "52px",
    },
    {
      text: "Action",
      className: "text-center dt-no-sorting sorting",
      ariaLabel: "Action: activate to sort column ascending",
      // ariaSort: "descending",
      width: "68px",
    },
  ],
  tableBody: [
    {
      expense: "Salaries",
      description: "Company staff salaries",
      amount: "1200000",
      issuer: "Angela",
      date: "12/04/2021",
      serialNo: "p0owPVQMO3",
      link: "/singleexpensereport",
    },
    {
      expense: "Excavator",
      description: "Sand Excavartor",
      amount: "120000",
      issuer: "Angela",
      date: "1/05/2021",
      serialNo: "p0owPVQMO3",
      link: "/singleexpensereport",
    },
    {
      expense: "Party",
      description: "Company staff party",
      amount: "100000",
      issuer: "Angela",
      date: "17/04/2021",
      serialNo: "p0owPVQMO3",
      link: "/singleexpensereport",
    },
    {
      expense: "Transportation",
      description: "Company car repairs",
      amount: "110000",
      issuer: "Angela",
      date: "5/08/2021",
      serialNo: "p0owPVQMO3",
      link: "/singleexpensereport",
    },
  ],
  tableFooter: [
    "Expenses",
    "Description",
    "Amount",
    "Issuer",
    "Date",
    "Serial No",
  ],
};
const ExpenseReport = () => {
  return (
    <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
      <div className="widget-content widget-content-area br-6">
        <div
          id="default-ordering_wrapper"
          className="dataTables_wrapper container-fluid dt-bootstrap4"
        >
          {/* BEGINNING OF VIEW ORDERS SEARCH BAR */}
          <ViewordersSearchbar />
          {/* END OF VIEW ORDERS SEARCH BAR */}
          <div className="table-responsive">
            <table
              id="default-ordering"
              className="table table-hover dataTable"
              style={{ width: "100%" }}
              role="grid"
              aria-describedby="default-ordering_info"
            >
              {/* BEGINNING OF VIEW ORDERS TABLE HEADER */}
              <ExpenseReportTablehead content={expenseReportData.tableHeader} />
              {/* END OF VIEW ORDERS TABLE HEADER */}
              {/* BEGINNING OF VIEW ORDERS TABLE BODY */}
              <ExpenseReportTablebody content={expenseReportData.tableBody} />
              {/* END OF VIEW ORDERS TABLE BODY */}
              {/* BEGINNING OF VIEW ORDERS TABLE FOOTER*/}
              <ExpenseReportTablefooter
                content={expenseReportData.tableFooter}
              />
              {/* END OF VIEW ORDERS TABLE FOOTER*/}
            </table>
          </div>
          {/* BEGINNING OF VIEW ORDERS TABLE PAGINAITION*/}
          <ExpenseReportTablepaiginaition />
          {/* END OF VIEW ORDERS TABLE PAGINAITION*/}
        </div>
      </div>
    </div>
  );
};

export default ExpenseReport;
