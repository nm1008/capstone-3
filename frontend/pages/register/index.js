//IMPORTS
import {Fragment, useEffect,useState,useContext} from 'react'
import {Form,Button} from 'react-bootstrap'
import Router from 'next/router'
import Swal from 'sweetalert2'
import Head from 'next/head'

export default function Register(){

	//STATES
	const [firstName,setFirstName] = useState("")
	const [lastName,setLastName] = useState("")
	const [email,setEmail] = useState("")
	const [mobileNo,setMobileNo] = useState(0)
	const [password1,setPassword1] = useState("")
	const [password2,setPassword2] = useState("")
	const [isActive,setIsActive] = useState(true)

	//will run on every change to our user's input
	useEffect(()=>{

		if((firstName !== "" && lastName !== "" && email !== "" && mobileNo !== "" && password1 !== "" && password2 !== "") && (
			password1 === password2) && (mobileNo.length === 11)){

			setIsActive(true)

		}else{

			setIsActive(false)
		}
	},[firstName,lastName,email,mobileNo,password1,password2])

	//ONSUBMIT FUNCTION
	function registerUser(e){

		e.preventDefault()

		//check if an email already exists
		fetch('https://enigmatic-escarpment-37058.herokuapp.com/api/users/email-exists',{
			method: 'POST',
			headers: {

				'Content-Type': 'application/json'
			},
			body: JSON.stringify({

				email: email
			})
		})
		.then(res => res.json())
		.then(data => {

			/*

				If the email used is already registered what will be returned?
				true

				If data is false, then we will run our fetch request to register the user. We'll show a sweetalert if otherwise.
			*/

			if(data === false){

				fetch('https://enigmatic-escarpment-37058.herokuapp.com/api/users/',{

					method: 'POST',
					headers: {

						'Content-Type': 'application/json'

					},
					body: JSON.stringify({

						firstName: firstName,
						lastName: lastName,
						email: email,
						mobileNo: mobileNo,
						password: password1

					})

				})
				.then(res => res.json())
				.then(data => {

					/*
						The data returned for a successful registration is a boolean too.

						true, if successfully registered and false if otherwise.

						We'll show a sweetalert for both instances and clear the input fields.

						We'll redirect the user to the login page if they have successfully logged in.

					*/

					if(data){

						Swal.fire({
							icon: "success",
							title: "Successfully Registered.",
							text: "Thank you for registering."
						})

						Router.push('/login')

					} else {

						Swal.fire({
							icon: "error",
							title: "Registration Failed",
							text: "Something went wrong."
						})
					}
				})

			} else {

				Swal.fire({
					icon: 'error',
					title: 'Registration Failed.',
					text: 'Email Already Registered.'
				})
			}
		})

		//clear the input fields
		setFirstName("")
		setLastName("")
		setEmail("")
		setMobileNo(0)
		setPassword1("")
		setPassword2("")
	}

	return (
		<Fragment>
			
			<Head>
				<title>Registration</title>
			</Head>

			<Form onSubmit={e => registerUser(e)} className="mt-5">
			
				<Form.Group controlId="userFirstName">
					<Form.Label>First Name</Form.Label>
					<Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required/>
				</Form.Group>

				<Form.Group controlId="userLastName">
					<Form.Label>Last Name</Form.Label>
					<Form.Control type="text" placeholder="Enter Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required/>
				</Form.Group>

				<Form.Group controlId="userEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} required/>
				</Form.Group>

				<Form.Group controlId="mobileNo">
					<Form.Label>Mobile Number</Form.Label>
					<Form.Control type="number" placeholder="Enter Mobile No." value={mobileNo} onChange={e => setMobileNo(e.target.value)} required/>
				</Form.Group>

				<Form.Group controlId="password1">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Enter Password" value={password1} onChange={e => setPassword1(e.target.value)} required/>
				</Form.Group>

				<Form.Group controlId="password2">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control type="password" placeholder="Confirm Password" value={password2} onChange={e => setPassword2(e.target.value)} required/>
				</Form.Group>

				{
					isActive
					?
					<Button variant="primary" type="submit">Register</Button>
					:
					<Button variant="primary" disabled>Register</Button>
				}
				
			</Form>
		</Fragment>
	)

}