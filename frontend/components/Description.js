import {useState,useEffect,useContext} from 'react'
import {Card,Button} from 'react-bootstrap'

export default function Description({descriptionProp}){

	const {_id,description,type} = descriptionProp

	return (
			<Card className="my-3">
				<Card.Body>
					<Card.Title>
						{description}
					</Card.Title>
					<Card.Text>
						{type}
					</Card.Text>
				</Card.Body>
			</Card>
		)

}
