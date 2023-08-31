import { useCallback, useState } from "react";
import "./components/TrackerInputForm/TrackerInputForm";
import TrackerInputForm from "./components/TrackerInputForm/TrackerInputForm";
import ExpenseItemList from "./components/expenseItemList/expenseItemList";
import FilterComponent from "./components/FilterComponent/FilterComponent";
import ExpensesChart from "./components/ExpensesChart/ExpensesChart";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2023");

  const addExpenseHandler = (expenseData) => {
    let updatingExpense = expenses.find(
      (expense) => expense.id === expenseData.id
    );
    if (updatingExpense) {
      setExpenses((previousExpenses) => {
        return previousExpenses.map((expense) => {
          if (expense.id === updatingExpense.id) {
            expense.title = expenseData.title;
            expense.price = expenseData.price;
            expense.date = expenseData.date;
          }
          return expense;
        });
      });
      setSelectedExpense(null);
    } else {
      setExpenses((previousExpenses) => [...previousExpenses, expenseData]);
    }
  };

  const deleteExpenseItem = async (expenseId) => {
    let response = await fetch(
      `https://react-expenses-tracker-ad23f-default-rtdb.firebaseio.com/expenses/${expenseId}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let updatedExpenseList = expenses.filter(
      (expense) => expense.id !== expenseId
    );
    setExpenses(updatedExpenseList);
  };

  const updateSelectedExpenseHandler = (expenseId) => {
    let selected = expenses.find((expense) => expense.id === expenseId);
    setSelectedExpense(selected);
  };

  const updateExpenseHandler = (expenseData) => {
    setExpenses((previousExpenses=>{
      return previousExpenses.map((expense)=>{
        if (expense.id === expenseData.id) {
          expense.price = expenseData.price;
          expense.title = expenseData.title;
          expense.date = expenseData.date;
        }
        return expense
      })
    }))
  };

  const changeYearHandler = (year) => {
    setSelectedYear(year);
  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      new Date(expense.date).getFullYear().toString() === selectedYear
  );

  const getExpenses = useCallback((expenses) => {
    setExpenses(expenses);
  }, []);

  return (
    <div className="container">
      <TrackerInputForm
        onAddExpense={addExpenseHandler}
        onUpdate={updateExpenseHandler}
        selectedExpense={selectedExpense}
      />
      <FilterComponent
        onChangeYear={changeYearHandler}
        selectedYear={selectedYear}
      />
      <ExpensesChart expenses={filteredExpenses} />

      <ExpenseItemList
        onGetExpenses={getExpenses}
        expenses={filteredExpenses}
        onDeleteItem={deleteExpenseItem}
        onUpdateItem={updateSelectedExpenseHandler}
      />
    </div>
  );
}

export default App;
