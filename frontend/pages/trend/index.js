//IMPORTS
import {Fragment, useState, useEffect} from 'react'
import {Form, Button} from 'react-bootstrap'
import LineChart from '../../components/LineChart'
import Head from 'next/head'

export default function Trend(){

	return(
		<Fragment>
			<Head>
				<title>Balance Trend</title>
			</Head>

			<h1 className="text-center mt-5">Balance Trend</h1>

			<LineChart />
			
		</Fragment>

	)

}