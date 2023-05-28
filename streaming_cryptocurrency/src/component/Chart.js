import React, {useState, useEffect} from 'react'
import axios from 'axios'
import "../Style/Chart.css"
import { useParams } from 'react-router-dom';

const Chart = () => {
  const { id } = useParams();
  const [coinsDetail, setCoinsDetail] = useState([]);
  console.log("coinsDetail",coinsDetail)

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=14&interval=daily`
        );
        console.log("fectcoin by id ")
        setCoinsDetail(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCoins();
  }, [id]);

  return (
    <div className='chart'>chart</div>
  )
}

export default Chart