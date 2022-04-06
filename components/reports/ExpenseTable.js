import { useState } from 'react';
import { Table } from '@mantine/core';
import styles from '../../styles/Table.module.css'
import { Button, Modal, TextInput } from '@mantine/core';


export default function ExpenseTable({expenses}){
    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [vendor, setVendor] = useState('');

    const [opened, setOpened] = useState(false);

    const rows = expenses.map((expense) => (
      <tr key={expense._id}>
        <td>{expense.product}</td>
        <td>{expense.price}</td>
        <td>{expense.vendor}</td>
      </tr>
    ));

    const sum = expenses.reduce((total, expense) => {
      return total + expense.price;
    }, 0);

    const addExpense = async (expenseData) => {
      const response = await fetch("/api/addExpense", {
        method: "POST",
        body: JSON.stringify(expenseData),
        headers: 
        {
          "Content-Type": 
          "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      }



   return (
     <>
    <div className="flex items-center justify-center space-x-5 mb-3">
      <Button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" onClick={() => setOpened(true)}>Add Expense</Button>
      <h2>Total Expenses:<br/><span>{parseFloat(sum).toFixed(2)}</span></h2>
    </div>
    <Table striped highlightOnHover fontSize="md" horizontalSpacing="xl" verticalSpacing="md"
    className=""
    >
      <caption className={styles.caption}>Expense Report</caption>
    <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Vendor</th>
      </tr>
    </thead>
    <tbody>{rows}</tbody>
  </Table>
  <Modal
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <div className="flex flex-col space-y-3 items-center justify-center">
          <label className="">Product:</label>
          <TextInput variant="filled" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Products Purchased" />
          <label className="">Price:</label>
          <TextInput variant="filled" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} placeholder="Cost" />
          <label className="">Vendor:</label>
          <TextInput variant="filled" value={vendor} onChange={(e) => setVendor(e.target.value)} placeholder="Vendor" />
          <Button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" onClick={() => addExpense({product: product, price: price, vendor: vendor})}>Add</Button>
        </div>
      </Modal>
  </>
   );
};

