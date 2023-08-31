import {useState,useEffect,useContext} from 'react'
import {Card} from 'react-bootstrap'

export default function ProfileComponent({profileProp}){

const {_id,firstName,lastName, email, mobileNo} = profileProp

	return(
			<Card className="my-3 text-center cardHighlight">
				<Card.Body>
					<Card.Title>
						Name: {firstName} {lastName}
					</Card.Title>

					<Card.Text>
						Email Address : {email} 
					</Card.Text>

					<Card.Text>
						Mobile Number : {mobileNo}
					</Card.Text>
				
				</Card.Body>
			</Card>
		)
}
