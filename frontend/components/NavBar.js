//imports
import {useContext} from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import UserContext from '../userContext'
import Link from 'next/link'

export default function NavBar(){

	//{user} contains the email and isAdmin values that is stored in the localStorage
	const {user} = useContext(UserContext)

	return (

			<Navbar bg="primary" expand="lg">	
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						
						
						{
							//if email is existing in the localStorage only the logout button will appear
							user.email
							?
								<>
									<Link href="/record">
										<a className="navbar-brand text-white ">Expense Manager</a>
									</Link>

									<Link href="/category">
										<a className="nav-link text-white" role="button">Categories</a>
									</Link>

									<Link href="/record">
										<a className="nav-link text-white" role="button">Records</a>
									</Link>

									<Link href="/record/income">
										<a className="nav-link text-white" role="button">Monthly Income</a>
									</Link>

									<Link href="/record/expense ">
										<a className="nav-link text-white" role="button">Monthly Expense</a>
									</Link>

									<Link href="/trend">
										<a className="nav-link text-white" role="button">Trend</a>
									</Link>

									<Link href="/breakdown">
										<a className="nav-link text-white" role="button">Breakdown</a>
									</Link>

									<Link href="/logout">
										<a className=" nav-link text-white" role="button">Logout</a>
									</Link>

								</>
								
							//else no email the login and register button will appear
							//homepage is directly accessed to login page
							:
								<>
									<Link href="/">
										<a className="navbar-brand text-white ">Expense Manager</a>
									</Link>

									<Link href="/about">
										<a className="nav-link text-white" role="button">About</a>
									</Link>
							
									<Link href="/register">
										<a className="nav-link text-white" role="button">Register</a>
									</Link>

									
								</>
						}		
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
}