import  React,{Component} from 'react';
import './App.css';
import  coronaImage from './image/image.png';
import Cards from './Components/Cards/Cards';
import CountryPicker from './Components/CountryPicker/CountryPicker';
import Chart from './Components/Chart/Chart';
import {fetchData} from './api';
import { styled } from '@material-ui/core';


class App extends React.Component {
  state={
    data: {},
    country: '', 
  }

  async componentDidMount(){
    const fetchedData =await fetchData();

    this.setState({data:fetchedData});

  }
    handleCountryChange = async(country)=>{
      const fetchedData =await fetchData(country);
      this.setState({data: fetchedData, country: country});
  

    }
  render(){
    const {data,country} =this.state
    return (
      <div className="container">
        <img className='image' src={coronaImage} alt="COVID-19"/>
    <Cards data={data}/>
    <CountryPicker handleCountryChange={this.handleCountryChange} />
    <Chart data={data} country={country}/>
    </div>
  );
}
}

export default App;
