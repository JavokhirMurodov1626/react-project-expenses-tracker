import Chart from "../Chart/chart";

function ExpensesChart({ expenses }) {
  const chartDataPoints = [
    { label: "Jan", value: 0 },
    { label: "Feb", value: 0 },
    { label: "Mar", value: 0 },
    { label: "Apr", value: 0 },
    { label: "May", value: 0 },
    { label: "Jun", value: 0 },
    { label: "Jul", value: 0 },
    { label: "Aug", value: 0 },
    { label: "Sep", value: 0 },
    { label: "Oct", value: 0 },
    { label: "Nov", value: 0 },
    { label: "Dec", value: 0 },
  ];

  expenses.forEach((expense) => {
    let month = new Date(expense.date).getMonth();
    chartDataPoints[month].value += expense.price;
  });

  return (
    <section className="col-xxl-6 col-md-11 mx-auto mt-3">
      <Chart dataPoints={chartDataPoints} />
    </section>
  );
}
export default ExpensesChart;
