import React from "react";
import Skeleton from "react-loading-skeleton";
import { functionUtils } from "../../hooks/function-utils";

import { ReactComponent as Followers } from "../../assets/followers.svg";
import { ReactComponent as Linkk } from "../../assets/link.svg";
import { ReactComponent as Chat } from "../../assets/chat.svg";
import excavator from "../../assets/excavator.jpg";
import stockImg from "../../assets/excavator2.jpg";
import stockpiledImg from "../../assets/excavator3.jpg";

import { ReactComponent as WetSandIcon } from "../../assets/rain-cloud.svg";
import { ReactComponent as StockpliedIcon } from "../../assets/shine.svg";
import { ReactComponent as StockIcon } from "../../assets/container.svg";

const CustomDetailedStats = ({ data }) => {
  return (
    <div
      className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12"
      style={{
        // display: "flex",
        justifySelf: "center",
      }}
    >
      <div
        className="row widget-statistic"
        style={{ justifyContent: "center", justifySelf: "center" }}
      >
        {data[0] === "load"
          ? data.map((item, i) => (
              <div
                key={i}
                className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing"
              >
                <div className="widget widget-one_hybrid widget-followers">
                  <div
                    className="widget-heading"
                    style={{ marginBottom: "0px" }}
                  >
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                    <Skeleton height={300} />
                  </div>
                </div>
              </div>
            ))
          : data[0] === "loading"
          ? data.map((item, i) => (
              <div
                key={i}
                className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing"
              >
                <div className="widget widget-one_hybrid widget-followers">
                  <div
                    className="widget-heading"
                    style={{ marginBottom: "0px" }}
                  >
                    <Skeleton height={70} />
                  </div>
                </div>
              </div>
            ))
          : data[0].array === true
          ? data.map((item, i) => {
              console.log("string: ", item.stats);
              return (
                <div
                  key={i}
                  className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing"
                >
                  <div className="widget widget-one_hybrid widget-followers">
                    <div
                      className="widget-heading"
                      style={{ marginBottom: "0px" }}
                    >
                      <div className="w-title">
                        <div className="w-icon">
                          {item.icon ? (
                            <img src={item.icon} alt="svg icon" />
                          ) : null}
                        </div>
                        <div className="">
                          <p className="w-value">
                            {functionUtils.addCommaToNumbers(item.stats)}
                          </p>
                          <h5 className="">{item.legend}</h5>
                        </div>
                      </div>
                      {!item.img ? null : (
                        <div
                          style={{
                            backgroundImage: `url(${
                              item?.followers
                                ? excavator
                                : item?.linkk
                                ? stockpiledImg
                                : item?.chat
                                ? stockImg
                                : null
                            })`,
                            height: "300px",
                            width: "100%",
                            backgroundSize: "cover",
                            // backgroundSize: item.followers
                            //   ? "cover"
                            //   : item.linkk
                            //   ? "contain"
                            //   : item.chat
                            //   ? "contain"
                            //   : "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            borderRadius: "10px",
                            marginTop: "2rem",
                          }}
                        ></div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          : data.map((item, i) => {
              console.log("string: ", item.stats);
              return (
                <div
                  key={i}
                  className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing"
                >
                  <div className="widget widget-one_hybrid widget-followers">
                    <div
                      className="widget-heading"
                      style={{ marginBottom: "0px" }}
                    >
                      <div className="w-title">
                        <div className="w-icon">
                          {item.followers ? (
                            <StockpliedIcon />
                          ) : item.linkk ? (
                            <WetSandIcon />
                          ) : item.chat ? (
                            <StockIcon />
                          ) : null}
                        </div>
                        <div className="">
                          <p className="w-value">
                            {functionUtils.addCommaToNumbers(item.stats)}
                          </p>
                          <h5 className="">{item.legend}</h5>
                        </div>
                      </div>
                      {!item.img ? null : (
                        <div
                          style={{
                            backgroundImage: `url(${
                              item?.followers
                                ? excavator
                                : item?.linkk
                                ? stockpiledImg
                                : item?.chat
                                ? stockImg
                                : null
                            })`,
                            height: "300px",
                            width: "100%",
                            backgroundSize: "cover",
                            // backgroundSize: item.followers
                            //   ? "cover"
                            //   : item.linkk
                            //   ? "contain"
                            //   : item.chat
                            //   ? "contain"
                            //   : "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            borderRadius: "10px",
                            marginTop: "2rem",
                          }}
                        ></div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default CustomDetailedStats;
