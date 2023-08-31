//IMPORTS
import {Fragment, useEffect, useState} from 'react'
import {Pie} from 'react-chartjs-2'
import randomcolor from 'randomcolor'

export default function PieChart(){

	//STATES
	const [income, setIncome] = useState([])
	const [expense, setExpense] = useState([])

	const [incomeCategory, setIncomeCategory] = useState([])
	const [expenseCategory, setExpenseCategory] = useState([])

	const [incomeAmount, setIncomeAmount] = useState([])
	const [expenseAmount, setExpenseAmount] = useState([])
	
	const [incomeBGColors, setIncomeBGColors] = useState([])
	const [expenseBGColors, setExpenseBGColors] = useState([])

	//START INCOME DATA
	//FILTER INCOME RECORDS
	useEffect(() => {
		fetch('https://enigmatic-escarpment-37058.herokuapp.com/api/record')
		.then(res => res.json())
		.then(data => {

			let incomeList = data.filter(function(value){
				return value.type === "Income"
			})
			
			setIncome(incomeList)
		})

	},[])

	//GET INCOME CATEGORIES
	useEffect(() => {
		let incomeCategoryList = income.map(value => {
			return value.category
		})
			setIncomeCategory(incomeCategoryList)
	},[income])



	//GET INCOME AMOUNTS
	useEffect(() => {
		let incomeAmountList = income.map(value => {
			return value.amount
		})
			setIncomeAmount(incomeAmountList)
	},[income])

	//END INCOME DATA



	//START EXPENSE DATA
	//FILTER EXPENSE RECORDS
	useEffect(() => {
		fetch('https://enigmatic-escarpment-37058.herokuapp.com/api/record')
		.then(res => res.json())
		.then(data => {
			let expenseList = data.filter(function(value){
				return value.type === "Expense"	
			})
			setExpense(expenseList)
		})
	},[])	


	//GET EXPENSE CATEGORIES
	useEffect(() => {
		let expenseCategoryList = expense.map(value => {
			return value.category
		})
			setExpenseCategory(expenseCategoryList)
	},[expense])
	


	//GET EXPENSE AMOUNTS
	useEffect(() => {
		let expenseAmountList = expense.map(value => {
			return value.amount
		})
			setExpenseAmount(expenseAmountList)
	},[expense])

	//END EXPENSE DATA


	//randomcolor income chart
	useEffect(() => {
		setIncomeBGColors(income.map(() => randomcolor() ))
	},[income])


	//randomcolors expense chart
	useEffect(() => {
		setExpenseBGColors(expense.map(() => randomcolor() ))
	},[expense])



	//INCOME DATA PIE CHART
	const incomeBreakdown = {

		labels: incomeCategory,
		datasets: [{
			data: incomeAmount,
			backgroundColor: incomeBGColors
		}]
	}

	//EXPENSE DATA PIE CHART
	const expenseBreakdown = {

		labels: expenseCategory,
		datasets: [{
			data: expenseAmount,
			backgroundColor: expenseBGColors
		}]
	}
	
	return(
		<Fragment>

		<div className="row">
			
			<div className='col-lg-6 col-md-6 col-sm-6 mt-5'>
				<h2 className="text-center">Income</h2>
				<Pie data={incomeBreakdown}/>
			</div>

			<div className='col-lg-6 col-md-6 col-sm-6 mt-5'>
				<h2 className="text-center">Expense</h2>
				<Pie data={expenseBreakdown}/>
			</div>
			
		</div>
	
		</Fragment>
	)

}