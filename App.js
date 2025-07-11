import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/transactions")
      .then(res => setTransactions(res.data))
      .catch(() => alert("Error loading transactions"));
  }, []);

  const handleAdd = (newTx) => {
    setTransactions([newTx, ...transactions]);
  };

  const balance = transactions.reduce((acc, t) => {
    return t.type === "income" ? acc + t.amount : acc - t.amount;
  }, 0);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h1>💰 BudgetMate</h1>
      <h2>Current Balance: ₹{balance}</h2>
      <TransactionForm onAdd={handleAdd} />
      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App;
