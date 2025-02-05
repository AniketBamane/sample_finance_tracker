export const transformTransactions = (transactions) => {
  const monthMap = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const monthlySummary = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date); // Convert timestamp to Date object
    const monthName = monthMap[date.getMonth()]; // Get month name

    // Find existing month or create new entry
    let monthData = acc.find((entry) => entry.name === monthName);
    if (!monthData) {
      monthData = { name: monthName, income: 0, expenses: 0, savings: 0 };
      acc.push(monthData);
    }

    // Update income or expenses
    if (transaction.type === "income") {
      monthData.income += transaction.amount;
    } else {
      monthData.expenses += transaction.amount;
    }

    // Update savings
    monthData.savings = monthData.income - monthData.expenses;

    return acc;
  }, []);

  return monthlySummary;
};