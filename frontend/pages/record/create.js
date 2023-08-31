//IMPORTS
import {Fragment, useState,useEffect} from 'react'
import {Form, Button,Card} from 'react-bootstrap'
import Head from 'next/head'
import Swal from 'sweetalert2'


export default function CreateRecord(){

	//states
	const [type, setType] = useState("")
	const [category, setCategory] = useState("")
	const [name, setName] = useState("")
	const [amount, setAmount] = useState("")
	const [description, setDescription] = useState("")
	const [income, setIncome] = useState([])
	const [expense, setExpense] = useState([])
	const [allCategory, setAllCategory] = useState([])

	//onSubmit function
	function addRecord(e){
			e.preventDefault()

			let token = localStorage.getItem("token");

			fetch('https://enigmatic-escarpment-37058.herokuapp.com/api/record',{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					 'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({

					type: type,
					category: category,
					name: name,
					amount: amount,
					description: description
				})
			})
			.then(res => res.json())
			.then(data => {
				if(data){
					Swal.fire({

							icon: "success",
							title: "Successfully Added The Record",
							text: "Thank you using budget tracker"

					})	

				}else{
					Swal.fire({

						icon: "error",
						title: "Something is wrong",
						text: "error"

					})
				}
			})
			//AFTER SUBMIT RESET VALUE
			setType("")
			setCategory("")
			setName("")
			setAmount("")
			setDescription("")
		}

		//all categories
		useEffect(() => {

			fetch('https://enigmatic-escarpment-37058.herokuapp.com/api/category')
			.then(res => res.json())
			.then(data => {
				
				setAllCategory(data)
			})

		},[])

	//map the categories description
	const categoryList = allCategory.map(category => {

      return(
      	<Fragment>
      		
      		<option key={category._id}>{category.description}</option>
      	</Fragment>
      	)     
    })

	return(

		<Fragment>
			<Head>
				<title>Add Record</title>
			</Head>

			<h1 className="text-center mt-5">Add Record</h1>
			<Form onSubmit={e => addRecord(e)}>

				<Form.Group  className="">
					<Form.Label>Source of account</Form.Label>
					<select className="form-control form-control-md" value={type} onChange={e => setType(e.target.value)}>
					  <option disabled></option>
					   <option>Income</option>
					  <option>Expense</option>
					</select>
				</Form.Group>

				<Form.Group>
					<Form.Label>Category Name</Form.Label>
					<select className="form-control form-control-md" value={category} onChange={e => setCategory(e.target.value)}>
					<option disabled></option>
						{categoryList}
					</select>
				</Form.Group>

				<Form.Group>
					<Form.Label>Record Name</Form.Label>
					<Form.Control type="text" placeholder="Enter description" value={name} onChange={e => setName(e.target.value)} />
				</Form.Group>

				<Form.Group>
					<Form.Label>Amount</Form.Label>
					<Form.Control type="number" placeholder="Enter amount" value={amount} onChange={e => setAmount(e.target.value)}/>
				</Form.Group>

				<Form.Group>
					<Form.Label>Description</Form.Label>
					<Form.Control type="text" placeholder="Enter description" value={description} onChange={e => setDescription(e.target.value)}/>
				</Form.Group>

				<Button type="submit" variant="primary">Submit</Button>
			</Form>

		</Fragment>

	)
}