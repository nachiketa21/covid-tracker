import React from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";

import coronaImage from "./images/image.png";

import Darkmode from "darkmode-js";

new Darkmode().showWidget();

const options = {
  bottom: "32px", // default: '32px'
  right: "32px", // default: '32px'
  left: "unset", // default: 'unset'
  time: "0.8s", // default: '0.3s'
  mixColor: "#fff", // default: '#fff'
  backgroundColor: "#fff", // default: '#fff'
  buttonColorDark: "#100f2c", // default: '#100f2c'
  buttonColorLight: "#fff", // default: '#fff'
  saveInCookies: true, // default: true,
  autoMatchOsTheme: true, // default: true
};

const darkmode = new Darkmode(options);
darkmode.showWidget();

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };

  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country });
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="COVID-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
