import React,{useState,useEffect} from 'react';
 import styled  from './Chart.module.css';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
export default function Chart({data:{confirmed,recovered,deaths},country}) {

     const [ dailyData, setDailyData] = useState([]) ;
    
     useEffect(() => {

         const fetchAPI = async () => {
            setDailyData(await fetchDailyData() );
         }
        
        //  console.log(dailyData);

        
         fetchAPI();
     }, []);

     const lineChart =(
        dailyData.length
        ?( <Line   
           data={{
               labels:dailyData.map(({date})=>date),
               datasets:[{
                data:dailyData.map(({ confirmed }) =>confirmed),
                 label:'Infected',
                 borderColor: '#3333ff',
                 fill:true,
               }, {
                data:dailyData.map(({ deaths })=>deaths),
                label:'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill:true,
               }],
           }} 
           /> ):null  
           
           );
    
      const barChar =(
          
          confirmed 
          ?(
              <Bar
              data ={{
               labels:['Infected', 'Recovered','Deaths'],
               datasets:[{
                   label: 'people',
                   backgroundColor:[
                       'rgba(0, 0, 255, 0.5)',
                       'rgba(0, 255, 0, 0.5)',
                       'rgba(255,0, 0, 0.5)',
                   ],
                   data:[confirmed.value, 23580,deaths.value]
               }]
              }}
              options={{
               lengend:{display:false},
               title:{display:true, text:`Current state in ${country}`},
              }}
              />     
          ): null
      )

     

    return (


        <div className={styled.container}>
         {country ? barChar:lineChart}
        </div>


    )
}