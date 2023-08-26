import "./expenseItem.css";
import ExpenseItemDate from "./expenseItemDate/expenseItemDate";

function ExpenseItem({ expenseInfo,onDelete,onUpdate }) {
  
  return (
    <>
      <div className="expenseItem col-6 mx-auto p-3">
      <ExpenseItemDate expenseDate={expenseInfo.date}/>
        <h4 className="expenseItem__name">{expenseInfo.title}</h4>
        <div className="expenseItem__price px-3 py-2 my-auto">
          <i className="bi bi-currency-dollar"></i>
          <span>{expenseInfo.price}</span>
        </div>
        <div className="expenseItem__icons">
          <i className="bi bi-trash3" onClick={()=>onDelete(expenseInfo.id)}></i>
          <i className="bi bi-pencil-square" onClick={()=>onUpdate(expenseInfo.id)}></i>
        </div>
      </div>
    </>
  );
}

export default ExpenseItem;
