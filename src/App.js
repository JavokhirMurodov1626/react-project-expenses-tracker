import { useState } from "react";
import './components/TrackerInputForm/TrackerInputForm'
import TrackerInputForm from './components/TrackerInputForm/TrackerInputForm';
import ExpenseItem from './components/expenseItem/expenseItem';
import ExpenseItemList from './components/expenseItemList/expenseItemList'
import FilterComponent from "./components/FilterComponent/FilterComponent";
import ExpensesChart from "./components/ExpensesChart/ExpensesChart";

const expensesList=[
  {
    id:1,
    title:'lunch',
    price:123,
    date:'2021-05-12'
  },
  {
    id:2,
    title:'toilet Paper',
    price:30,
    date:'2022-04-14'
  },
  {
    id:3,
    title:'Monitor arm',
    price:60,
    date:'2023-01-22'
  },
  {
    id:4,
    title:'laptop',
    price:300,
    date:'2021-06-12'
  },
  {
    id:5,
    title:'mouse',
    price:50,
    date:'2022-05-14'
  },
  {
    id:6,
    title:'keyboard',
    price:200,
    date:'2023-06-22'
  },
]

function App() {

  const [expenses,setExpenses]=useState(expensesList);
  const [selectedExpense,setSelectedExpense]=useState(null);
  const [selectedYear, setSelectedYear]=useState('2023')

  const addExpenseHandler=(expenseData)=>{
    let updatingExpense=expenses.find(expense=>expense.id===expenseData.id)
    if(updatingExpense){
      setExpenses((previousExpenses=>{
        return previousExpenses.map((expense)=>{
          if(expense.id===updatingExpense.id){
            expense.title=expenseData.title;
            expense.price=expenseData.price;
            expense.date=expenseData.date;
          }
          return expense;
        })
      }))
      setSelectedExpense(null)
    }else{
      setExpenses((previousExpenses)=>[expenseData,...previousExpenses])
    }
  }

  const deleteExpenseItem =(expenseId)=>{
    let updatedExpenseList=expenses.filter((expense)=>expense.id!==expenseId);
    setExpenses(updatedExpenseList)
  }

  const updateExpenseHandler=(expenseId)=>{
    let selected=expenses.find(expense=>expense.id===expenseId)
   setSelectedExpense(selected)
  }
  
  const changeYearHandler=(year)=>{
    setSelectedYear(year)
  }

  const filteredExpenses=expenses.filter(expense=>new Date(expense.date).getFullYear().toString()===selectedYear)
  
  return (
    <div className="container">
        <TrackerInputForm onAddExpense={addExpenseHandler} onUpdate={updateExpenseHandler} selectedExpense={selectedExpense}/>
        <FilterComponent onChangeYear={changeYearHandler} selectedYear={selectedYear}/>   
        <ExpensesChart expenses={filteredExpenses}/>     
        <ExpenseItemList>
        {filteredExpenses.length===0 && <p className="text-center">There is no expenses yet!</p>}
        {
          filteredExpenses.map(expense=> <ExpenseItem key={expense.id} expenseInfo={expense} onDelete={deleteExpenseItem} onUpdate={updateExpenseHandler}/>)
        }
        </ExpenseItemList>
    </div>
    
  );
}

export default App;
