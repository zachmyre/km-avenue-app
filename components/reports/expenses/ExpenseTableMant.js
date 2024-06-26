// import { useState } from 'react';
// import { Table } from '@mantine/core';
// import { useRouter } from 'next/router'
// import styles from '../../../styles/Table.module.css'
// import { Button, Modal, TextInput, Select, Card, Image, Text, Badge, Group  } from '@mantine/core';
// import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'


// export default function ExpenseTableMant({expenses, refresh}){
//     const router = useRouter();
//     const refreshData = () => {
//       router.replace(router.asPath);
//     }

//     const [product, setProduct] = useState('');
//     const [price, setPrice] = useState('');
//     const [vendor, setVendor] = useState('');
//     const [filterNumber, setFilterNumber] = useState(-5);
//     const [editExpense, setEditExpense] = useState(false);
//     const [currentExpense, setCurrentExpense] = useState({_id: '', product: '', price: '', vendor: ''});
//     const [openedExpense, setOpenedExpense] = useState(false);
//     const [openEditExpense, setopenEditExpense] = useState(false);

//     const filteredExpenses = expenses.slice(filterNumber)
//     const rows = filteredExpenses.map((expense) => (
//       <tr key={expense._id} onClick={() => {
//         setEditExpense(true);
//         setCurrentExpense(expense);
//         }} >
//         <td>{expense.product}</td>
//         <td>{expense.price}</td>
//         <td>{expense.vendor}</td>
//         {/* <td><PencilAltIcon className="h-5 w-5 text-blue-500"/></td> */}
//       </tr>
//     ));

//     const sum = expenses.reduce((total, expense) => {
//       return total + expense.price;
//     }, 0);

//     const addExpense = async (expenseData) => {
//       const response = await fetch("/api/expenses/addExpense", {
//         method: "POST",
//         body: JSON.stringify(expenseData),
//         headers: 
//         {
//           "Content-Type": 
//           "application/json",
//         },
//       });
//       const data = await response;
//       if(data.status === 200){
//         refreshPage();
//       }
//       }

//     const deleteExpense = async () => {
//       console.log(currentExpense);
//       if(currentExpense._id){
//         const response = await fetch("/api/expenses/deleteExpense", {
//           method: "POST",
//           body: JSON.stringify(currentExpense),
//           headers:
//           {
//             "Content-Type":
//             "application/json",
//           },
//         });
//         const data = await response;
//         if(data.status === 200){
//           refreshPage();
//         }
//     }
//     }

//     const updateExpense = async () => {
//       if(currentExpense._id){
//         const response = await fetch("/api/expenses/editExpense", {
//           method: "POST",
//           body: JSON.stringify(currentExpense),
//           headers:
//           {
//             "Content-Type":
//             "application/json",
//           },
//         });
//         const data = await response;
//         if(data.status === 200){
//           refreshPage();
//         }
//       }
//     }

//     function refreshPage() {
//       setTimeout(() => {
//         refreshData();
//         setProduct('');
//         setPrice('');
//         setVendor('');
//         setEditExpense(false);
//         setOpenedExpense(false);
//         setopenEditExpense(false);
//       }, 300);
//     }

//    return (
//      <div className="flex flex-col items-center justify-center w-screen">
//     <div className="-x-5 mb-3">
//     <Card shadow="md" p="lg" className="flex items-center justify-center">
//         <Text size="lg">
//           Total Expenses: {parseFloat(sum).toFixed(2)}
//         </Text>
//       </Card>
//     </div>
//     <Button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" onClick={() => setOpenedExpense(true)}>Add Expense</Button>
//     <Select
//     className="mx-16 my-3"
//       label="Filter Expenses"
//       placeholder="5"
//       data={[
//         { value: -5, label: '5' },
//         { value: -10, label: '10' },
//         { value: -20, label: '20' },
//         { value: -50, label: '50' },
//         { value: 0, label: 'All' },
//       ]}
//       onChange={(e) => setFilterNumber(e)}
//       />
//     <Table striped highlightOnHover fontSize="sm" horizontalSpacing="xl" verticalSpacing="md"
//     className=""
//     >
//       <caption className={styles.caption}>Expense Report</caption>
//     <thead>
//       <tr>
//         <th>Product</th>
//         <th>Price</th>
//         <th>Vendor</th>
//         {/* <th>{' '}</th> */}
//       </tr>
//     </thead>
//     <tbody>{rows}</tbody>
//   </Table>
//   <Modal
//         opened={openedExpense}
//         onClose={() => setOpenedExpense(false)}
//       >
//         <div className="flex flex-col space-y-3 items-center justify-center">
//           <label className="">Product:</label>
//           <TextInput variant="filled" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Products Purchased" />
//           <label className="">Price:</label>
//           <TextInput variant="filled" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
//           <label className="">Vendor:</label>
//           <TextInput variant="filled" value={vendor} onChange={(e) => setVendor(e.target.value)} placeholder="Vendor" />
//           <Button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" onClick={() => {addExpense({product: product, price: parseFloat(price), vendor: vendor});}}>Add</Button>
//         </div>
//       </Modal>

//     <Modal
//       opened={openEditExpense}
//       onClose={() => setopenEditExpense(false)}
//     >
      
//       <div className="flex flex-col space-y-3 items-center justify-center">
//         <Text size='xl' className='font-bold'>Edit Expense</Text>
//         <label className="">Product:</label>
//         <TextInput variant="filled" value={currentExpense.product || ""} onChange={(e) => setCurrentExpense({...currentExpense, product: e.target.value || ""})} placeholder="Products Purchased" />
//         <label className="">Price:</label>
//         <TextInput variant="filled" value={currentExpense.price || ""} onChange={(e) => setCurrentExpense({...currentExpense, price: e.target.value || ""})} placeholder="Price" />
//         <label className="">Vendor:</label>
//         <TextInput variant="filled" value={currentExpense.vendor || ""} onChange={(e) => setCurrentExpense({...currentExpense, vendor: e.target.value || ""})} placeholder="Vendor" />
//         <Button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" onClick={() => {updateExpense({product: product, price: parseFloat(price), vendor: vendor});}}>Edit</Button>
//       </div>
//     </Modal>

//     <Modal
//       opened={editExpense}
//       onClose={() => setEditExpense(false)}
//     >
//       <div className="flex flex-row m-12 items-center justify-around">
//         <Text onClick={() => {setopenEditExpense(true); setEditExpense(false);}} size="xl" className="flex flex-col items-center justify-center active:border-4 active:border-blue-500 p-5 active:rounded">
//           Edit
//           <PencilAltIcon className="h-12 w-12 text-blue-500" />
//         </Text>
//         <Text onClick={() => {deleteExpense();}} size="xl" className="flex flex-col items-center justify-center active:border-4 active:border-red-500 p-5 active:rounded">
//           Delete
//         <TrashIcon className="h-12 w-12 text-red-500" />
//         </Text>
//       </div>
//     </Modal>
//   </div>
//    );
// };

