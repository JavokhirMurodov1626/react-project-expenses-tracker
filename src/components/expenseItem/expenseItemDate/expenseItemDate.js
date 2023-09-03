import styled from "styled-components";

function ExpenseItemDate({ expenseDate }) {

  let date = new Date(expenseDate);
  let year = date.getFullYear();
  let day = date.getDate();
  let month = date.toLocaleString("en-Us", { month: "long" });
  
  return (
    <StyledExpenseItemDate className="expenseDate">
      <Month className="expenseDate__month">{month}</Month>
      <Year className="expenseDate__year">{year}</Year>
      <Day className="expenseDate__day">{day}</Day>
    </StyledExpenseItemDate>
  );
}

const StyledExpenseItemDate = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 100px;
  width: 100%;
  border-radius: 8px;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  p {
    margin-bottom: 0;
    text-align: center;
  }
  @media screen and (max-width:320px){
    max-width: 80px;
  }

`;
const Month = styled.p`
  font-weight: bold;
  @media screen and (max-width:425px){
    font-size: 15px;
  }
  @media screen and (max-width:320px){
    font-size: 15px;
  }
`;

const Year = styled.p`
  font-size: 12px;
  @media screen and (max-width:320px){
    font-size: 11px;
  }
`;

const Day = styled.p`
  font-size: 24px;
  font-weight: bold;
  @media screen and (max-width:425px){
    font-size: 22px;
  }
  @media screen and (max-width:320px){
    font-size: 18px;
  }

`;
export default ExpenseItemDate;
