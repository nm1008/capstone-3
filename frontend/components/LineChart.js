//IMPORTS
import {Fragment, useState, useEffect} from 'react'
import {Line} from 'react-chartjs-2'

export default function LineChart(){

	//STATES
	const [amount, setAmount] = useState("")

	//GET RECORD AMOUNTS
	useEffect(() => {
	fetch('https://enigmatic-escarpment-37058.herokuapp.com/api/record')
	.then(res => res.json())
	.then(data => {
		
		const recordAmount = data.map(element => {
			
			return(element.amount)
			
			})
			setAmount(recordAmount)
		})
	},[])

	

	//LINE GRAPH DATA
	const dataTrend ={
		labels: amount,
		datasets: [{
			label: "List of Transaction",
			backgroundColor: 'lightblue',
			borderColor: 'white',
			borderWidth: 1,
			hoverBackgroundColor: 'lightblue',
			hoverBorderColor: 'black',
			data: amount // determinant for the bars
		}]
	}

	const options = {

		scales: {
			yAxes:[
				{
					ticks: {
						beginAtZero: true
						
					}
				}
			]
		}
	}

	return (
		<Fragment>
	
			<Line className="col-lg-12 col-md-12 col-sm-12" data={dataTrend} options={options}/>

		</Fragment>

			
			
	)
}