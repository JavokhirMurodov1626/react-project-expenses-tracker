import "./expenseItem.css";
import ExpenseItemDate from "./expenseItemDate/expenseItemDate";

function ExpenseItem({ expenseInfo,onDelete,onUpdate }) {
  
  return (
    <>
      <div className="expenseItem col-xxl-6 mx-auto p-3 col-md-11">
      <ExpenseItemDate expenseDate={expenseInfo.date}/>
        <h4 className="expenseItem__name">{expenseInfo.title}</h4>
        <div className="expenseItem__price px-md-3 py-md-2 my-auto px-1 py-1">
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
