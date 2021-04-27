import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import { BASE_API_URL } from "../../hooks/API";

import { ReactComponent as Followers } from "../../assets/followers.svg";
import { ReactComponent as Linkk } from "../../assets/link.svg";
import { ReactComponent as Chat } from "../../assets/chat.svg";

import excavator from "../../assets/excavator.jpg";
import stockImg from "../../assets/excavator2.jpg";
import stockpiledImg from "../../assets/excavator3.jpg";
const DetailedStatistics = () => {
  const [detailedStats, setDetailedStats] = useState([
    "loading",
    "loading",
    "loading",
  ]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const response = async () => {
      let detailedStatsList = [];
      await axios
        .get(`${BASE_API_URL}/api/v1/production/summary.php`)
        .then((res) => {
          let detailedStatsResponseList;
          let detailedStatsResponse = res.data;
          const stock = detailedStatsResponse.stock[0].stock;
          detailedStatsResponseList = [
            // detailedStatsResponse.completed,
            detailedStatsResponse.stockpiled,
            detailedStatsResponse.wet_sand,
            { stock },
          ];

          console.log("Detailed: ", detailedStatsResponse);
          if (res.data.error) {
            let title = "Server Error",
              text = res.data.message;
            errorAlert(title, text);
          } else {
            detailedStatsResponseList.map((item, id) => {
              console.log("Detailed Item: ", item);
              const total_wet_sand = Math.round(item.total_wet_sand);
              const total_stockpiled = Math.round(item.total_stockpiled);
              const total_stock = Math.round(item.stock);

              const detailedStatsSchema = {
                followers: total_stockpiled ? true : false,
                linkk: total_wet_sand ? true : false,
                chat: total_stock ? true : false,
                stats: total_stockpiled
                  ? total_stockpiled
                  : total_wet_sand
                  ? total_wet_sand
                  : total_stock
                  ? total_stock
                  : null,
                legend: total_stockpiled
                  ? "Stockpile"
                  : total_wet_sand
                  ? "Wet sand"
                  : total_stock
                  ? "Total stock"
                  : null,
              };

              return (detailedStatsList = detailedStatsList.concat(
                detailedStatsSchema
              ));
            });
            setDetailedStats(detailedStatsList);
            console.log("Recent order list: ", detailedStats);
          }
        })
        .catch((error) => {
          let title = "Network Error",
            text = error;
          errorAlert(title, text);
        });
    };

    response();

    return () => {
      source.cancel();
    };
  }, []);

  /** Multipurpose success, error and warning pop-ups for handling and displaying errors, success and warning alerts */
  const errorAlert = (title, text) => {
    Swal.fire({
      icon: "error",
      title: title,
      text: text,
      showConfirmButton: false,
    });
  };

  const DetailedStatsComponent = () => (
    <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12">
      <div className="row widget-statistic">
        {detailedStats[0] === "loading"
          ? detailedStats.map((item, i) => (
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
          : detailedStats.map((item, i) => (
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
                    <div
                      style={{
                        backgroundImage: `url(${
                          item.followers
                            ? excavator
                            : item.linkk
                            ? stockpiledImg
                            : item.chat
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
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
  return <DetailedStatsComponent />;
};

export default DetailedStatistics;
