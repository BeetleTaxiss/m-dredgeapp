import { ReactComponent as SummaryIncome } from "../../assets/income.svg";
import { ReactComponent as SummaryProfit } from "../../assets/profit.svg";
import { ReactComponent as SummaryExpenses } from "../../assets/expenses.svg";

export const SummaryDetails = ({ details }) => (
  <div className={`summary-list summary-${details.category}`}>
    <div className="summery-info">
      <div className="w-icon">
        {details.category === "income" ? (
          <SummaryIncome />
        ) : details.category === "profit" ? (
          <SummaryProfit />
        ) : details.category === "expenses" ? (
          <SummaryExpenses />
        ) : null}
      </div>

      <div className="w-summary-details">
        <div className="w-summary-info">
          <h6>
            {details.title}{" "}
            <span className="summary-count">₦{details.amount} </span>
          </h6>
          <p className="summary-average">{details.percentage}%</p>
        </div>
      </div>
    </div>
  </div>
);

export const summaryData = [
  {
    category: "income",
    icon: "#",
    title: "Income ",
    amount: "92,600",
    percentage: "90",
  },
  {
    category: "profit",
    icon: "#",
    title: "Profits ",
    amount: "42,600",
    percentage: "54",
  },
  {
    category: "expenses",
    icon: "#",
    title: "Expenses ",
    amount: "52,600",
    percentage: "60",
  },
];
