import React from "react";
import { ReactComponent as Followers } from "../../assets/followers.svg";
import { ReactComponent as Linkk } from "../../assets/link.svg";
import { ReactComponent as Chat } from "../../assets/chat.svg";
const DetailedStatistics = ({ data }) => {
  return (
    <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
      <div className="row widget-statistic">
        {data.map((item, i) => (
          <div
            key={i}
            className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing"
          >
            <div className="widget widget-one_hybrid widget-followers">
              <div className="widget-heading">
                <div className="w-title">
                  <div className="w-icon">
                    {item.followers ? (
                      <Followers />
                    ) : item.linkk ? (
                      <Linkk />
                    ) : item.chat ? (
                      <Chat />
                    ) : null}
                  </div>
                  <div className="">
                    <p className="w-value">{item.stats}</p>
                    <h5 className="">{item.legend}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedStatistics;
