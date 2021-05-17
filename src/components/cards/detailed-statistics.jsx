import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../hooks/API";

import CustomDetailedStats from "./CustomDetailedStats";
const DetailedStatistics = () => {
  const [detailedStats, setDetailedStats] = useState([
    "load",
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
          const stock = detailedStatsResponse?.stock[0]?.stock;
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
                img: true,
              };

              return (detailedStatsList =
                detailedStatsList.concat(detailedStatsSchema));
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

  return <CustomDetailedStats data={detailedStats} />;
};

export default DetailedStatistics;
