import "./Style/Home.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Coin from "./component/Coins";
import { useDocumentTitle } from "./setDocumentTitle";
import Chart from "./component/Chart";
function Home(props) {
  const document_title = useDocumentTitle("News of 100 cryptocurrency");
  const [coins, SetCoins] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .request({
          method: "GET",
          url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en",
          params: {
            vs_currency: "usd",
            page: "1",
            per_page: "100",
            order: "market_cap_desc",
          },
          headers: {
            "X-RapidAPI-Key":
              "0105e0348bmsh55696c5e4406ddap16167djsn9843cdfb9b8",
            "X-RapidAPI-Host": "coingecko.p.rapidapi.com",
          },
        })
        .then(
          (response) => {
            SetCoins(response.data);
          },
          (error) => {
            console.log(error);
          }
        );
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input
            className="coin-input"
            type="text"
            onChange={handleChange}
            placeholder="Search"
          />
        </form>
      </div>
      {filteredCoins.map((coin) => {
        
        return (
          <div key={coin.id}>
            <Coin
              id={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.total_volume}
              volume={coin.market_cap}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />
    
          </div>
        );
      })}
    </div>
  );
}

export default Home;
