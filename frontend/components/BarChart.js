import {useState, useEffect, Fragment} from 'react'
import {Form, Button,Card} from 'react-bootstrap'
import {Bar} from 'react-chartjs-2'
import moment from 'moment'

export default function BarChart(){

	//states
	const [income, setIncome] = useState([])
	const [expense, setExpense] = useState([])

	const [totalIncome, setTotalIncome] = useState([])
	const [totalExpense, setTotalExpense] = useState([])

	const [months, setMonths] = useState([])
	
	const [monthlyIncome, setMonthlyIncome] = useState([])
	const [monthlyExpense, setMonthlyExpense] = useState([])



	//filter type:income
	useEffect(() => {
		fetch('https://enigmatic-escarpment-37058.herokuapp.com/api/record')
		.then(res => res.json())
		.then(data => {
			let incomeList = data.filter(function(value){
				return value.type === "Income"		
			})
			
			setIncome(incomeList)
		})

	},[])


	//filter type:expense
	useEffect(() => {
		fetch('https://enigmatic-escarpment-37058.herokuapp.com/api/record')
		.then(res => res.json())
		.then(data => {
			
			let expenseList = data.filter(function(value){
				
				return value.type === "Expense"
			})
			setExpense(expenseList)
		})
	},[])	



	useEffect(() => {
		const expenseTotal = expense.map(expense => {
			return expense.amount
		})
		
		const value = expenseTotal.reduce(function(x,y){
			return x+y
		}, 0)

		setTotalExpense(value)
	},[expense])

	

	//income - expense = total Balance / remaining balance
	let remainingBalance = totalIncome - totalExpense
	
	//
	useEffect(() => {
		fetch('https://enigmatic-escarpment-37058.herokuapp.com/api/record')
		.then(res => res.json())
		.then(data => {
			// console.log(data)
			let incomeList = data.filter(function(value){
				return value.type === "Income"
		
			})	
			setIncome(incomeList)
		})
	},[])


	// Income Bar Graph
	const graphMonths =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

	useEffect(() => {

		let tempMonths =[]

		income.forEach(element => {
			// console.log(moment(element.addedOn).format('MMMM'))

			if(!tempMonths.find(month => month === moment(element.addedOn).format('MMMM'))){

				tempMonths.push(moment(element.addedOn).format('MMMM'))
			}
		})

		tempMonths.sort((a,b) =>{

			if(monthsRef.indexOf(a) !== -1 && monthsRef.indexOf(b) !== -1 ){
				return monthsRef.indexOf(a) - monthsRef.indexOf(b)
			}
		})

		setMonths(tempMonths)

	},[income])

	useEffect(() => {
		setMonthlyIncome(graphMonths.map(month =>{
			let total = 0

			income.forEach(element => {

				if(moment(element.addedOn).format('MMMM') === month){

					total += parseInt(element.amount)
				}
			})

			return total

		}))
	},[months])



	//income graph data
	const dataIncome = {
		labels: graphMonths, //x-axis label
		datasets: [{
			label: "Monthly Income for the Year 2021", // bar label
			backgroundColor: 'green',
			borderColor: 'white',
			borderWidth: 1,
			hoverBackgroundColor: 'green',
			hoverBorderColor: 'black',
			data: monthlyIncome // determinant for the bars
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
	//End Income Graph


	// Start Expense Bar Graph
	useEffect(() => {

		let tempMonths =[]

		expense.forEach(element => {
			// console.log(moment(element.addedOn).format('MMMM'))

			if(!tempMonths.find(month => month === moment(element.addedOn).format('MMMM'))){

				tempMonths.push(moment(element.addedOn).format('MMMM'))
			}
		})

		tempMonths.sort((a,b) =>{

			if(monthsRef.indexOf(a) !== -1 && monthsRef.indexOf(b) !== -1 ){
				return monthsRef.indexOf(a) - monthsRef.indexOf(b)
			}
		})

		setMonths(tempMonths)

	},[expense])


	useEffect(() => {
		setMonthlyExpense(graphMonths.map(month =>{
			let total = 0
			

			expense.forEach(element => {

				if(moment(element.addedOn).format('MMMM') === month){

					total += parseInt(element.amount)
				}
			})

			return total

		}))
	},[months])


	//expense graph data
	const dataExpense = {
		labels: graphMonths, //x-axis label
		datasets: [{
			label: "Monthly Expense for the Year 2021", // bar label
			backgroundColor: 'red',
			borderColor: 'white',
			borderWidth: 1,
			hoverBackgroundColor: 'red',
			hoverBorderColor: 'black',
			data: monthlyExpense // determinant for the bars
		}]
	}

	const options2 = {

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
	//end expense graph


	return(
		<Fragment>

		<div className="row">

			<div className="col-lg-6 col-md-6 col-sm-6">
				<Bar data={dataIncome} options={options}/>
			</div>

			<div className="col-lg-6 col-md-6 col-sm-6">
				<Bar data={dataExpense} options={options2}/>
			</div>

		</div>

		</Fragment>
	)
}