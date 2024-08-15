import "src/assets/css/cardAccueilChart.css"
import Chart from 'react-apexcharts'
import { customizeNumerFormat } from "src/utils/functionsUtils"
import { useEffect, useState } from "react"


const ChartItems = ({value,title})=>{

    return(
        <div className="d-flex justify-content-between align-items-center">
            <p className="fw-bold fs-6 py-0 my-0 text-uppercase" > {title} </p>
            <p className="fw-bolder fs-5 py-0 my-0" > {customizeNumerFormat(value || 0)} F CFA </p>
        </div>
    )
}



const optionsChart =  {

    series: [0,0],
    options: {
        colors: ["#000000", "#000000",],
        chart: {
            id: 'apexchart-example',
            stackType: '100%',
        },
        legend: {
            show: false,},
        responsive: [{
            breakpoint: 480,
            options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            },
            labels:{
                position: 'bottom'
            }
            }
        }]
    },
  }





export function CardAccueilChartBons({total_montant,title,total,chartColors,values=[]}) {

    const [cahrtOptions,setCahrtOptions] = useState(optionsChart)
    const [chartValues,setChartValues] = useState([])


    useEffect(()=>{
        setChartValues(values)
        const valuesChecked = values?.map(value => !!value ? value : 0)
        setCahrtOptions(prev=>({
            ...prev,
            series:valuesChecked,
            options: {
                ...prev?.options,
                colors: chartColors,
                labels:["TSP","ODP"],
            }
        }))
        
    },[values,chartColors])


    return ( 
        <section className="card_accueil_chart shadow p-3 ">
            <div className="card_accueil_chart__header py-2">
                <h4 className="my-2 text-center" > {title}</h4>
                <div className="d-flex justify-content-between align-items-center">
                    <p className="fw-bold" > Nombre total {title} : </p>
                    <p className="fw-bolder fs-3" > {total} </p>
                </div>
            </div>
            <div className="card_accueil_chart__body">
                <Chart 
                    options={cahrtOptions?.options} 
                    series={cahrtOptions?.series} 
                    type="donut" 
                />
                <div className=''>
                    <h6 className="fw-bolder" >Montant total </h6>
                    <ChartItems
                        value={!!chartValues?.length ? chartValues[0] :0}
                        title="tsp"
                    />
                    <ChartItems
                        value={!!chartValues?.length ? chartValues[1] : 0}
                        title=" odp"
                    />
                    <ChartItems
                        value={total_montant}
                        title=" Total"
                    />
                    
                </div>
            </div>
        </section>
     );
}
