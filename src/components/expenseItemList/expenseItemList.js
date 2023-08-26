import './expenseItemList.css'

function ExpenseItemList(props){
    return(
        <section className="expenseItemList">{props.children}</section>
    )
}
export default ExpenseItemList