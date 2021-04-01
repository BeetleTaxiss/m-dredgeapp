import React from "react";
import Breadcrumbs from "./breadcrumbs";
import DropdownFilter from "./dropdown-filter";

const PageHeader = () => {
  const breadCrumbsData = [
    { text: "Dashboard", link: "#" },
    { text: "Analytics", link: "#", active: true },
  ];
  return (
    <div className="page-header">
      <Breadcrumbs items={breadCrumbsData} />
      {/* <DropdownFilter /> */}
    </div>
  );
};

export default PageHeader;
