import "./expenseItemList.css";
import { useState,useEffect,useCallback } from "react";
import ExpenseItem from "../expenseItem/expenseItem";

function ExpenseItemList({ expenses,onDeleteItem,onUpdateItem,onGetExpenses }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchExpenses = useCallback( async () => {
    try {
      const response = await fetch(
        "https://react-expenses-tracker-ad23f-default-rtdb.firebaseio.com/expenses.json"
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
        }

        onGetExpenses(expensesList);
        setIsLoading(false);
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (e) {
      setError(e);
    }
  },[onGetExpenses]);

  useEffect(() => {
    setIsLoading(true);
    fetchExpenses();
  }, [fetchExpenses]);

  //generating content for filtered list section
  let content;
   if (!isLoading && expenses.length > 0 && !error) {
    content = expenses.map((expense) => (
      <ExpenseItem
        key={expense.id}
        expenseInfo={expense}
        onDelete={onDeleteItem}
        onUpdate={onUpdateItem}
      />
    ));
  }
  else if (!isLoading && expenses.length === 0) {
    content = <p className="text-center">There is no expenses yet!</p>;
  } else if (!isLoading && error) {
    content = <p className="text-center">{error}</p>;
  } else if (isLoading) {
    content = <p className="text-center">Loading...</p>;
  }

  return <section className="expenseItemList">{content}</section>;
}
export default ExpenseItemList;
