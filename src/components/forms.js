import React, { useState, useEffect } from 'react';
import Chart from './chart.js';

export default function Forms() {
  const [options, setOptions] = useState({});
  const [bitcoinRate, setBitcoinRate] = useState(0);
  const [currency, setCurrency] = useState("");

  const handleChange = (event) => {
    event.preventDefault();
    setBitcoinRate(event.target.value);
    let index = event.nativeEvent.target.selectedIndex;
    setCurrency(event.nativeEvent.target[index].text);
    console.log(currency);
  };

  useEffect(() => {
    async function fetchData() {
      await fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
            .then(resp => resp.json())
            .then(data => {
              setOptions(data.bpi)
              setBitcoinRate(data.bpi.USD.rate)
              setCurrency(data.bpi.USD.description);
            });
    }
    fetchData();
  }, []);

  return (
    <div className="row form-wrapper">
      <div className="col-6">
        <form>
          <div className="form-group">
            <label
              htmlFor="bitOptions"
              className="text-muted"
            >
              1 Bitcoin Equals
            </label>
            <select
              className="form-control" 
              id="bitOptions"
              onChange={handleChange}
            >
              {Object.keys(options).map((item, index) => {
                return (
                  <option
                    key={index}
                    value={options[item].rate}
                  >
                      {options[item].description}
                  </option>
                )
              })}
            </select>
          </div>
        </form>
        <p
          className="font-weight-bold"
          style={{"fontSize" :"2rem"}}
        >
          {bitcoinRate} {currency}
        </p>
      </div>
      <div className="col-6">
        <Chart cur={currency}/>
      </div>
    </div>
  );
}
