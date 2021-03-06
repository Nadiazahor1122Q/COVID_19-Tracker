import React,{useState, useEffect} from 'react';
import styles from './CountryPicker.module.css';
import { NativeSelect, FormControl} from '@material-ui/core';
import { fetchCountries } from '../../api';


export default function CountryPicker({ handleCountryChange }) {
  const [fetchedCountries, setFetchedCountries] = useState([]);

  useEffect (()=>{

    const fetchAPI = async ()=>{

          setFetchedCountries( await  fetchCountries() );
      }
      fetchAPI()
  }, [setFetchedCountries]);
    // console.log(fetchedCountries);


    return (
         <FormControl className={styles.FormControl}>
         <NativeSelect defaultValue="" onChange={(e)=> handleCountryChange(e.target.value)}>
             <option value=''>Global</option>
             {fetchedCountries.map((country,i)=> <option key={i} value={country}>{country}</option>)}
         </NativeSelect>
         </FormControl>
    )
}