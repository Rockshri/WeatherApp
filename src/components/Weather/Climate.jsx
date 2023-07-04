import React, { useEffect, useState } from "react";
import "./Climate.css";

const Climate = () => {
  // let converterBool = true;
  const [inputVal, setinputVal] = useState("");
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });
  const [sunTime, setSuntime] = useState({
    sunset: "",
    sunrise: "",
  });

  useEffect(() => {
    if (city == "") {
      return;
    }

    weatherAPI(city);
  }, [city]);

  useEffect(() => {
    if (!weatherData) {
      return;
    }
    sunHandler();
  }, [weatherData]);

  //ASYNC AWAIT

  // console.log(weatherData);
  // async function weatherAPI(city){
  //   const fetchdata = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=9edf441a5be86efc17b65d7464c1339d");
  //   console.log(fetchdata);
  //   const objectData = await fetchdata.json();
  //   console.log(objectData);
  //   newOne  = objectData
  //   console.log(newOne);

  //   // return objectData

  //   setWeatherData(newOne);
  //   console.log(weatherData);
  // }

  //USING PROMISE
  function weatherAPI(city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=9edf441a5be86efc17b65d7464c1339d"
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setWeatherData(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function clickHandler(e) {
    e.preventDefault();
    if (inputVal == "") {
      return;
    }
    setCity(inputVal);
    let d = new Date();
    let date = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
    let time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

    setDateTime({ ...dateTime, date, time });

    setinputVal("");
  }
  // function converterHandler(e){
  //   if(!weatherData){
  //       return
  //   }
  //     e.preventDefault();
  //     converterBool = !converterBool;
  //     if(converterBool == false){
  //       setWeatherData({...weatherData,  })
  //     }
  // }

  function sunHandler() {
    if (!weatherData) {
      return;
    }
    let arr = [];
    let sunsetTime = "";
    let sunriseTime = "";
    let sunSet = weatherData.sys.sunset;
    let sunRise = weatherData.sys.sunrise;
    arr.push(sunSet);
    arr.push(sunRise);
    console.log(sunSet);
    for (let i = 0; i < arr.length; i++) {
      let dd = new Date(arr[i] * 1000);
      let hour = dd.getHours();
      let min = dd.getMinutes();

      if (i == 0) {
        sunsetTime = `${hour}:${min}`;
        continue;
      }
      sunriseTime = `${hour}:${min}`;
    }
    setSuntime({ ...sunTime, sunset: sunsetTime, sunrise: sunriseTime });
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 ">
            <div className="header-name">WEATHER REPORT</div>
            <div className="row city-name">
              <div className="col-3">DELHI</div>
              <div className="col-3">LONDON</div>
              <div className="col-3">PARIS</div>
              <div className="col-3">BANGLURU</div>
            </div>
          </div>
          <div className="col-12 ">
            <div className="row search-box">
              <div className="col-md-12 ">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Search City"
                  value={inputVal}
                  onChange={(e) => setinputVal(e.target.value)}
                />
              </div>
              <div className="col-md-6 col-6">
                <button
                  type="submit"
                  className="search-button"
                  onClick={(e) => clickHandler(e)}
                >
                  Search
                </button>
              </div>
              <div className="col-md-6 col-6">
                <button type="submit" className="temp-converter">
                  CnF
                </button>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="row time-date">
              <div className="col-6">
                Date :- {weatherData ? dateTime.date : "N/A"}
              </div>
              <div className="col-6">
                Time :- {weatherData ? dateTime.time : "N/A"}{" "}
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="row place-temp">
              <div className="col-md-4 place">
                CITY :- {city != "" ? city.toUpperCase() : "N/A"}
              </div>
              <div className="col-md-4 temp">
                {weatherData
                  ? Math.floor(weatherData.main.temp - 273.15)
                  : "N/A"}{" "}
                degC
              </div>
              <div className="col-md-4">
                <div className="row row-cols-1 humidity-wind">
                  <div className="col humidity">
                    HUMIDITY :-{" "}
                    {weatherData ? weatherData.main.humidity : "N/A"}
                  </div>
                  <div className="col wind">
                    PRESSURE :-{" "}
                    {weatherData ? weatherData.main.pressure : "N/A"}
                  </div>
                  <div className="col cloud">
                    WEATHER :-{" "}
                    {weatherData ? weatherData.weather[0].main : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="row sun-rise-set">
              <small className="col-3">
                Sunset :- {weatherData ? sunTime.sunset : "no-data"}{" "}
              </small>
              <small className="col-3">
                Sunrise :- {weatherData ? sunTime.sunrise : "no-data"}
              </small>
              <small className="col-3">
                Min-temp :-{" "}
                {weatherData
                  ? Math.floor(weatherData.main.temp_min - 273.15)
                  : "N/A"}{" "}
                degC
              </small>
              <small className="col-3">
                Max-temp :-{" "}
                {weatherData
                  ? Math.floor(weatherData.main.temp_max - 273.15)
                  : "N/A"}{" "}
                degC
              </small>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Climate;

