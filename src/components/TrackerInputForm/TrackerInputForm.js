import styles from "./TrackerInputForm.module.css";
import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { v4 as uuidv4 } from "uuid";

function TrackerInputFrom({ onAddExpense, selectedExpense }) {
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expensePrice, setExpensePrice] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [hasError, setHasError] = useState(false);
  let inputRef = useRef(null);

  useEffect(() => {
    if (selectedExpense) {
      setIsUpdating(true);
      setExpenseTitle(selectedExpense.title);
      setExpensePrice(selectedExpense.price);
      setExpenseDate(selectedExpense.date);
    }
  }, [selectedExpense]);

  const sendExpense = async (data) => {
    try{
      const response = await fetch(
        "https://react-expenses-tracker-ad23f-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
    
      );
      console.log(response)
    }catch(e){
      console.log(e)
    }
  };

  const expenseTitleHandler = (event) => {
    setExpenseTitle(event.target.value);
  };
  const expensePriceHandler = (event) => {
    setExpensePrice(event.target.value);
  };
  const expenseDateHandler = (event) => {
    setExpenseDate(event.target.value);
  };
  const exepenseResetHandler = () => {
    setExpenseDate("");
    setExpensePrice("");
    setExpenseTitle("");
    setIsUpdating(false);
  };
  const submitFormHandler = (event) => {
    event.preventDefault();
    if (expenseTitle === "" || expenseDate === "" || expensePrice === "") {
      setHasError(true);
    } else {
      const data = {
        title: expenseTitle,
        price: expensePrice,
        date: expenseDate,
      };

      // onAddExpense(data);
      sendExpense(data)
      setExpenseDate("");
      setExpensePrice("");
      setExpenseTitle("");
      setIsUpdating(false);
    }
  };

  const cancelErrorHandler = () => {
    setHasError(false);
  };

  return (
    <>
      {hasError && (
        <>
          {createPortal(
            <div className={styles.overlay} onClick={cancelErrorHandler}></div>,
            document.getElementById("overlay")
          )}
          {createPortal(
            <div className={styles.errorModal}>
              <p>You have to fill all fields!!</p>
              <button
                onClick={cancelErrorHandler}
                className="btn btn-outline-primary"
              >
                Cancel
              </button>
            </div>,
            document.getElementById("error-modal")
          )}
        </>
      )}

      <form
        onSubmit={submitFormHandler}
        className={`${styles.form} col-6 px-3 py-5 mx-auto mt-5`}
      >
        <div className="mb-3">
          <label htmlFor="expenseName" className="mb-2 fw-bold">
            Expense Title
          </label>
          <input
            ref={inputRef}
            value={expenseTitle}
            id="expenseName"
            className="form-control"
            type="text"
            onChange={expenseTitleHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="expenseAmount" className="mb-2 fw-bold">
            Expense Amount
          </label>
          <input
            value={expensePrice}
            id="expenseAmount"
            className="form-control"
            type="number"
            onChange={expensePriceHandler}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="expenseDate" className="mb-2 fw-bold">
            Date
          </label>
          <input
            value={expenseDate}
            id="expenseDate"
            className="form-control"
            type="date"
            onChange={expenseDateHandler}
          />
        </div>
        <div className={styles.buttons}>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={exepenseResetHandler}
          >
            Reset
          </button>
          <button type="submit" className="btn btn-primary">
            {isUpdating ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </>
  );
}
export default TrackerInputFrom;
