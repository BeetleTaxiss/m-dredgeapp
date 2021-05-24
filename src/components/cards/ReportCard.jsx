import React from "react";
const ReportCard = ({ content }) => {
  const handleFormatting = (string) => {
    return { __html: string };
  };
  return (
    <div className="bio layout-spacing ">
      <div
        className="widget-content widget-content-area"
        style={{ textAlign: "left", padding: "20px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1>Activity Report</h1>
        </div>

        <div style={{ textAlign: "left", marginBottom: "1.5rem" }}>
          <table>
            <tbody>
              <tr>
                <td>
                  <p style={{ marginBottom: "0.2rem" }}>
                    <span style={{ fontWeight: "bold" }}>Date submitted</span>
                  </p>
                </td>
                <td>
                  <p style={{ marginBottom: "0.2rem" }}>: </p>
                </td>
                <td>
                  <p style={{ marginBottom: "0.2rem", paddingLeft: "0.3rem" }}>
                    {content["submitted-date"]}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p style={{ marginBottom: "0.2rem" }}>
                    <span style={{ fontWeight: "bold" }}>Week submitted</span>
                  </p>
                </td>
                <td>
                  <p style={{ marginBottom: "0.2rem" }}>: </p>
                </td>
                <td>
                  <p style={{ marginBottom: "0.2rem", paddingLeft: "0.3rem" }}>
                    {" "}
                    {content.week}
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p style={{ marginBottom: "0.2rem" }}>
                    <span style={{ fontWeight: "bold" }}>Submitted by</span>
                  </p>
                </td>
                <td>
                  <p style={{ marginBottom: "0.2rem" }}>: </p>
                </td>
                <td>
                  <p style={{ marginBottom: "0.2rem", paddingLeft: "0.3rem" }}>
                    {content["submitted-by"]}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="">Completed Tasks</h3>
        <p
          dangerouslySetInnerHTML={handleFormatting(content["tasks-completed"])}
        ></p>

        <h3 className="">Ongoing Tasks</h3>
        <p
          dangerouslySetInnerHTML={handleFormatting(content["tasks-ongoing"])}
        ></p>

        <h3 className="">Next week Tasks</h3>
        <p
          dangerouslySetInnerHTML={handleFormatting(content["nextweek-tasks"])}
        ></p>
      </div>
    </div>
  );
};

export default ReportCard;
