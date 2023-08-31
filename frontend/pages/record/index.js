//imports
import {Fragment, useState,useEffect} from 'react'
import {Form, Button,Card} from 'react-bootstrap'
import Head from 'next/head'
import Swal from 'sweetalert2'
import BarChart from '../../components/BarChart'

export default function record(){

	//states
	const [income, setIncome] = useState([])
	const [expense, setExpense] = useState([])
	const [totalIncome, setTotalIncome] = useState([])
	const [totalExpense, setTotalExpense] = useState([])


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


	//income card
	const incomeList = income.map(income => {
		return(
			<Fragment>
				<Card className="my-5">
					<Card.Body>
						<Card.Title>{income.category}</Card.Title>
						<Card.Text>Income: ₱{income.amount} {income.description}</Card.Text>
					</Card.Body>
				</Card>
			</Fragment>
		)
	})

	//expense card
	const expenseList = expense.map(expense => {
		return(
			<Fragment>
				<Card className="my-5">
					<Card.Body>
						<Card.Title>{expense.category}</Card.Title>
						<Card.Text>Expense: ₱{expense.amount} {expense.description}</Card.Text>
					</Card.Body>
				</Card>
			</Fragment>
		)
	})


	//account balance of user
	useEffect(() => {
	const totalBalance = income.map(income => {
		
		return income.amount
	})


	//reduce method to add all the amount
	const value = totalBalance.reduce(function (x,y){
		return x+y
	}, 0)

	setTotalIncome(value)
	},[income])
	
	


	//GET EXPENSE AMOUNT
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
	let x = totalIncome
	let y = totalExpense
	let remainingBalance = totalIncome - totalExpense
	


	return(

		<Fragment>
			<Head>
				<title>Dashboard</title>
			</Head>
			
			<h3 className="text-center mt-5">DASHBOARD</h3>
		
	
			<Card className="my-5 cardHighlight">
				<Card.Body>
					<h4 className="text-center mb-3">Your Account Balance</h4>
					<h4 className="text-center mb-3">₱ {remainingBalance}</h4>
						<div className="row">

							<div className="col-lg-4 col-md-4 col-sm-4">
								<a href="./record/create"><Button variant="primary" className="btn btn-block mb-2">Add Record</Button></a>
							</div>

							<div className="col-lg-4 col-md-4 col-sm-4">
								<a href="./record/search"><Button variant="primary" className="btn btn-block mb-2">Search Record</Button></a>
							</div>

							<div className="col-lg-4 col-md-4 col-sm-4">
								<a href="/profile"><Button variant="primary" className="btn btn-block mb-2">Profile Page</Button></a>
							</div>

						</div>
				</Card.Body>
			</Card>

			<div className="row text-center mt-5">
				<div className="col-lg-6 col-md-6 col-sm-6 mb-5">
					<Card className="cardHighlight">
						<Card.Body>

							<h4 >Recent Income</h4>
							<h4 >Total: ₱ {totalIncome}</h4>

						</Card.Body>
					</Card>
				</div>

				<div className="col-lg-6 col-md-6 col-sm-6 mb-5">
					<Card className="cardHighlight">
						<Card.Body>

							<h4 >Recent Expenses</h4>
							<h4 >Total: ₱ {totalExpense}</h4>

						</Card.Body>
					</Card>
				</div>
			</div>

			<BarChart />

		</Fragment>
	)

}

