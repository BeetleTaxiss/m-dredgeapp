import React from "react";
import WidgetHeader from "../general/widget-header";
const RecentSummaryHeader = ({ content }) => (
  <thead>
    <tr>
      {content.map((item, i) => (
        <th key={i}>
          <div className="th-content">{item}</div>
        </th>
      ))}
    </tr>
  </thead>
);

const RecentSummaryBody = ({ content }) => (
  <tbody>
    {content.map((item, i) => (
      <tr key={i}>
        <td>
          <div className="td-content product-name" style={{ height: "42px" }}>
            {item.itemMetaInfo.image && (
              <img src={item.itemMetaInfo.image} alt="product" />
            )}

            <div className="align-self-center">
              <p className="prd-name">{item.itemMetaInfo.text}</p>
              {/* <p className="prd-category text-primary">Digital</p> */}
            </div>
          </div>
        </td>
        {item?.fields?.map((field, i) => (
          <td key={i}>
            <div className="td-content">
              <span className="pricing">
                {field.amount && "₦"}
                {field.text}
              </span>
            </div>
          </td>
        ))}
      </tr>
    ))}
  </tbody>
);
const RecentSummary = ({ data }) => {
  return (
    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
      <div className="widget widget-table-three">
        <WidgetHeader
          title={data.widgetHeaderTitle}
          links={data.widgetHeaderLinks}
          dropdown
        />
        <div className="widget-content">
          <div className="table-responsive">
            <table className="table table-scroll">
              <RecentSummaryHeader content={data.header} />
              <RecentSummaryBody content={data.body} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentSummary;
