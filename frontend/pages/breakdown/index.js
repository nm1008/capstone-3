//IMPORTS
import {Fragment, useEffect, useState} from 'react'
import PieChart from '../../components/PieChart'
import Head from 'next/head'

export default function Break(){
	return (

		<Fragment>
		
			<Head>
				<title>Category Breakdown</title>
			</Head>

			<h1 className="text-center mt-5">Category Breakdown</h1>
			<PieChart />	
			
		</Fragment>

		)
}