import {Fragment} from 'react'
import {Row, Col, Jumbotron} from 'react-bootstrap'
import Head from 'next/head'


export default function About(){
	return(

		<Fragment>
		
		<Head>
			<title>About</title>
		</Head>>

			<Row>
				<Col>
					<Jumbotron className="mt-5">
						<h1 className="text-center">ABOUT PAGE</h1>
					</Jumbotron>
				</Col>
			</Row>

				<h5 className="text-center mt-5">
					Welcome to Expense Manager, your number one source for expenses tracking. I dedicate this to provide you the best of tracking experience, with a focus on dependability and customer service.
				</h5>


				<h5 className="text-center mt-5">Just a little brief background on the maker of this project, Hi I'm Nikko a career shifter been working as a kitchen staff previously and tried to learn being a developer.</h5>

					<br />

				<h5 className="text-center">
						Currently the website is still under development. If you have other suggestions please feel free to send a mail at mallari088nikko@gmail.com 
				</h5>

					<br />

				<h5 className="text-right">Sincerely,</h5>
				<h5 className="text-right">Nikko :)</h5>

		</Fragment>
		)
}