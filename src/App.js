import { useEffect, useState } from "react";
import "./components/TrackerInputForm/TrackerInputForm";
import TrackerInputForm from "./components/TrackerInputForm/TrackerInputForm";
import ExpenseItem from "./components/expenseItem/expenseItem";
import ExpenseItemList from "./components/expenseItemList/expenseItemList";
import FilterComponent from "./components/FilterComponent/FilterComponent";
import ExpensesChart from "./components/ExpensesChart/ExpensesChart";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2023");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(
        "https://react-expenses-tracker-ad23f-default-rtdb.firebaseio.com/expense.json"
      );
      const data = await response.json();
      if (response.status === 200 && data !== null) {
        let expensesList = [];
        for (let key in data) {
          let listItem = {
            id: key,
            date: data[key].date,
            price: data[key].price,
            title: data[key].title,
          };
          expensesList.push(listItem);
          setExpenses(expensesList);
        }
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);
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
      setExpenses((previousExpenses) => [expenseData, ...previousExpenses]);
    }
  };

  const deleteExpenseItem = (expenseId) => {
    let updatedExpenseList = expenses.filter(
      (expense) => expense.id !== expenseId
    );
    setExpenses(updatedExpenseList);
  };

  const updateExpenseHandler = (expenseId) => {
    let selected = expenses.find((expense) => expense.id === expenseId);
    setSelectedExpense(selected);
  };

  const changeYearHandler = (year) => {
    setSelectedYear(year);
  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      new Date(expense.date).getFullYear().toString() === selectedYear
  );

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
      <ExpenseItemList>
        {filteredExpenses.length === 0 && (
          <p className="text-center">There is no expenses yet!</p>
        )}
        {filteredExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expenseInfo={expense}
            onDelete={deleteExpenseItem}
            onUpdate={updateExpenseHandler}
          />
        ))}
      </ExpenseItemList>
    </div>
  );
}

export default App;
