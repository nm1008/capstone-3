//imports
import {Fragment, useState,useEffect} from 'react'
import {Form, Button,Card} from 'react-bootstrap'
import Head from 'next/head'
import Swal from 'sweetalert2'
import moment from 'moment'

export default function Expense(){

	//states
	const [income, setIncome] = useState([])

	//FILTER RECORD BY INCOME
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

	const incomeList = income.map(income => {
		return(
			<Fragment>
				<Card className="my-5 text-center cardHighlight">
					<Card.Body>
						<Card.Title>{income.category}</Card.Title>
						<h6 className="text-success">
						
							Income: ₱ {income.amount}, 

							 ({income.description})
						
							
						</h6>
						<Card.Text>{moment(income.addedOn).format('MMMM Do YYYY')}</Card.Text>
					</Card.Body>
				</Card>
			</Fragment>
		)
	})

	

	return(
		<Fragment>
			<Head>
				<title>Income History</title>
			</Head>

			<h1 className="text-center mt-5">History of Income Transaction</h1>

			{incomeList}

			<a href="/record"><Button variant="primary" className="btn btn-block mb-2">Go Back To Records</Button></a>

		</Fragment>
		)
}