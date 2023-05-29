import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import "chart.js/auto";
import "chartjs-adapter-moment";
import moment from "moment";
import "../Style/Chart.css";
import "moment/locale/en-gb";
import { useDocumentTitle } from "../setDocumentTitle";
import { Link } from "react-router-dom";

const Chart = () => {
  const document_title = useDocumentTitle("Price Chart");
  const { id } = useParams();
  const [coinsDetail, setCoinsDetail] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=14&interval=daily`
        );
        setCoinsDetail(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCoins();
  }, [id]);

  moment.locale("en-gb");

  const chartData = {
    labels: coinsDetail.prices
      ? coinsDetail.prices.map((data) => moment(data[0]).toDate())
      : [],
    datasets: [
      {
        label: "Price",
        data: coinsDetail.prices
          ? coinsDetail.prices.map((data) => data[1])
          : [],
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: "MMM D",
          displayFormats: {
            day: "MMM D",
          },
        },
      },
    },
  };

  return (
    <div className="chart">
      <h2>Price {id} chart</h2>
    
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
      <div className="back">
      <Link to="/" >
        <button className="back-button"> Back to Home</button>
      </Link>
      </div>
     
    </div>
  );
};

export default Chart;
