//imports
import {Fragment, useState, useEffect} from 'react'
import {Card, Button} from 'react-bootstrap'
import ProfileComponent from '../../components/Profile'
import Head from 'next/head'


export default function Profile(){

	const [userDetails, setUserDetails] = useState("")

	useEffect(() => {
		let token = localStorage.getItem('token')


	//fetch userDetails
	fetch('https://enigmatic-escarpment-37058.herokuapp.com/api/users/details',{
			headers: {
				'Authorization': `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			
			setUserDetails(data)
		})
	},[])


	//fetch data to component data 
	let data = userDetails

	return (
		<Fragment>
		
			<Head>
				<title>Profile Page</title>
			</Head>>

			<h1 className="mt-5 text-center">Profile Page</h1>
			<ProfileComponent profileProp={data}/>
			<a href="/record"><Button variant="primary" className="btn btn-block mb-2">Go Back To Records</Button></a>
			
		</Fragment>

		)
}