//imports
import {Fragment, useState,useEffect} from 'react'
import {Form, Button,Card} from 'react-bootstrap'
import Head from 'next/head'
import Swal from 'sweetalert2'
import moment from 'moment'

export default function Expense(){

	//states
	const [expense, setExpense] = useState([])

	//FILTER RECORD BY EXPENSES
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

	//MAPPING EXPENSES
	const expenseList = expense.map(expense => {
		return(
			<Fragment>
				<Card className="my-5 text-center cardHighlight">
					<Card.Body>
						<Card.Title>{expense.category}</Card.Title>
						<h6 className="text-danger">
						
							Expense: ₱ {expense.amount}, 

							({expense.description})
						
						</h6>
						
						<Card.Text>{moment(expense.addedOn).format('MMMM Do YYYY')}</Card.Text>
					</Card.Body>
				</Card>
			</Fragment>
		)
	})

	return(
		<Fragment>
				<Head>
					<title>Expense History</title>
				</Head>

			<h1 className="text-center mt-5">History of Expense Transaction</h1>

			{expenseList}

			<a href="/record"><Button variant="primary" className="btn btn-block mb-2">Go Back To Records</Button></a>

		</Fragment>
	)
}