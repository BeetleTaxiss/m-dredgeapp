import React from "react";
import CustomTableList from "../general/custom-table-list/custom-table-list";
import ReportCard from "./ReportCard";
export const showDetailedLogItem = (logItem) => {
  let keyValuePair = [];
  let oldKeyValuePair = [];
  let newData;
  let oldData;

  if (logItem["tasks-completed"]) {
    // for (const [key, value] of Object.entries(logItem)) {
    //   keyValuePair = keyValuePair.concat({
    //     id: key,
    //     fields: [
    //       {
    //         class: "text-left",
    //         itemClass: "text-center",
    //         item: key,
    //       },
    //       {
    //         class: "text-left",
    //         itemClass: "text-center",
    //         item: value,
    //       },
    //     ],
    //   });
    // }
    // /** Detailed Log List Table Data */
    // const detailedLogListTableData = {
    //   tableTitle: "Single Activity Report",
    //   header: [
    //     { class: "", title: "Activity Field" },
    //     { class: "", title: "Value" },
    //   ],
    //   body: keyValuePair,
    // };
    return <ReportCard content={logItem} />;
    // return <CustomTableList content={detailedLogListTableData} />;
  }

  let extendedNewData = JSON.parse(logItem.data && logItem.data);

  if (logItem?.data) {
    if (extendedNewData.data) {
      newData = extendedNewData.data && extendedNewData.data;
    } else {
      newData = JSON.parse(logItem.data && logItem.data);
    }
  }
  if (logItem?.data_old) {
    oldData = JSON.parse(logItem.data_old && logItem.data_old);
  }

  if (logItem.action === "delete") {
    for (const [key, value] of Object.entries(newData)) {
      keyValuePair = keyValuePair.concat({
        id: key,
        fields: [
          {
            class: "text-left",
            itemClass: "text-center",
            item: key,
          },
          {
            class: "text-left",
            itemClass: "text-center",
            item: value,
          },
        ],
      });
    }
    /** Detailed Log List Table Data */
    const detailedLogListTableData = {
      tableTitle: "Deleted Item",
      header: [
        { class: "", title: "Data Field" },
        { class: "", title: "Value" },
      ],
      body: keyValuePair,
    };
    return <CustomTableList content={detailedLogListTableData} />;
  }

  if (logItem.action === "update") {
    for (const [key, value] of Object.entries(newData)) {
      keyValuePair = keyValuePair?.concat({
        id: key,
        fields: [
          {
            class: "text-left",
            itemClass: "text-center",
            item: key,
          },
          {
            class: "text-left",
            itemClass: "text-center",
            item: value,
          },
        ],
      });
    }
    for (const [key, value] of Object.entries(oldData)) {
      oldKeyValuePair = oldKeyValuePair.concat({
        id: key,
        fields: [
          {
            class: "text-left",
            itemClass: "text-center",
            item: key,
          },
          {
            class: "text-left",
            itemClass: "text-center",
            item: value,
          },
        ],
      });
    }
    /** Detailed Log List Table Data */
    const detailedLogListTableData = {
      tableTitle: "Old Item",
      header: [
        { class: "", title: "Data Field" },
        { class: "", title: "Value" },
      ],
      body: keyValuePair,
    };
    /** Detailed Log List Table Data */
    const detailedOldLogListTableData = {
      tableTitle: "Updated Item",
      header: [
        { class: "", title: "Data Field" },
        { class: "", title: "Value" },
      ],
      body: oldKeyValuePair,
    };
    return (
      <>
        <CustomTableList content={detailedLogListTableData} />
        <br />
        <CustomTableList content={detailedOldLogListTableData} />
      </>
    );
  }

  if (logItem.action === "update" && extendedNewData.data) {
    for (const [key, value] of Object.entries(extendedNewData.data)) {
      keyValuePair = keyValuePair?.concat({
        id: key,
        fields: [
          {
            class: "text-left",
            itemClass: "text-center",
            item: key,
          },
          {
            class: "text-left",
            itemClass: "text-center",
            item: value,
          },
        ],
      });
    }
    for (const [key, value] of Object.entries(oldData)) {
      oldKeyValuePair = oldKeyValuePair.concat({
        id: key,
        fields: [
          {
            class: "text-left",
            itemClass: "text-center",
            item: key,
          },
          {
            class: "text-left",
            itemClass: "text-center",
            item: value,
          },
        ],
      });
    }
    /** Detailed Log List Table Data */
    const detailedLogListTableData = {
      tableTitle: "Old Item",
      header: [
        { class: "", title: "Data Field" },
        { class: "", title: "Value" },
      ],
      body: keyValuePair,
    };
    /** Detailed Log List Table Data */
    const detailedOldLogListTableData = {
      tableTitle: "Updated Item",
      header: [
        { class: "", title: "Data Field" },
        { class: "", title: "Value" },
      ],
      body: oldKeyValuePair,
    };
    return (
      <>
        <CustomTableList content={detailedLogListTableData} />
        <br />
        <CustomTableList content={detailedOldLogListTableData} />
      </>
    );
  }
};
