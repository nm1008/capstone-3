//imports
import {Fragment, useState,useEffect} from 'react'
import {Form, Button,Card} from 'react-bootstrap'
import Head from 'next/head'
import Swal from 'sweetalert2'
import moment from 'moment'

export default function Search(){

	//states
	const [description, setDescription] = useState("")
	const [name, setName] = useState("")
	const [type, setType] = useState("")
	const [result, setResult] = useState([])


	//onSubmit function
	function searchTransaction(e){
		e.preventDefault()

		fetch('https://enigmatic-escarpment-37058.herokuapp.com/api/record')
		.then(res => res.json())
		.then(data => {
			
			let filteredRecord = data.filter(function(value){
				
				return value.type ===  type && value.category === description || value.name === description
			})
			
			setResult(filteredRecord)	
		})
	}
	console.log(result)

	let dataSearch = result.map(element => {
		
		return(
			
			<Card className="my-3 text-center">
				<Card.Body>
					<Card.Title>{element.category}</Card.Title>
					<Card.Text>{element.name}</Card.Text>
					<Card.Text>{element.amount}</Card.Text>
					<Card.Text>{moment(element.addedOn).format('MMMM Do YYYY')}</Card.Text>
				</Card.Body>
			</Card>

			)
	})

	return (

		<Fragment >
		<Head>
			<title>Search Record</title>
		</Head>


		<h1 className="mt-5 text-center">Search Record</h1>
			<Form onSubmit={e => searchTransaction(e)}>

				<Form.Group className="mt-5">
					<Form.Label>Search Keyword</Form.Label>
					<Form.Control type="text" placeholder="Enter the Keyword" value={description} onChange={e => setDescription(e.target.value)}/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Source of account</Form.Label>
						<select className="form-control form-control-md" value={type} onChange={e => setType(e.target.value)}>
						 <option disabled></option>
						 <option>Income</option>
						 <option>Expense</option>
						</select>
				</Form.Group>

				<Button type="submit" variant="primary" className="mt-3 btn btn-block">Submit</Button>

			</Form>
			{dataSearch}
			

		</Fragment>
	)
}
