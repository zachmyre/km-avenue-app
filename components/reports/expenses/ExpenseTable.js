import { useState } from 'react';
import { useRouter } from 'next/router'
import { Modal, TextInput, Select, Text  } from '@mantine/core';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { Card, CardContent, Typography } from '@mui/material';


export default function ExpenseTable({expenses}){
    const router = useRouter();
    const refreshData = () => {
      router.replace(router.asPath);
    }

    const [product, setProduct] = useState('');
    const [price, setPrice] = useState('');
    const [vendor, setVendor] = useState('');
    const [editExpense, setEditExpense] = useState(false);
    const [currentExpense, setCurrentExpense] = useState({_id: '', product: '', price: '', vendor: ''});
    const [openedExpense, setOpenedExpense] = useState(false);
    const [openEditExpense, setopenEditExpense] = useState(false);

    const rowsTwo = (expenses && expenses.length > 0) ? reverseArr(expenses) : [];

    function reverseArr(input) {
      var ret = new Array;
      for(var i = input.length-1; i >= 0; i--) {
          ret.push(input[i]);
      }
      return ret;
  }

  const sum = expenses.reduce((total, expense) => {
    return total + expense.price;
  }, 0);

  const columns = [
    { field: 'product', headerName: 'Product', flex:1, minWidth: 50 },
    { field: 'price', headerName: 'Price', flex:1, minWidth: 50 },
    { field: 'vendor', headerName: 'Vendor', flex:1, minWidth: 50 },
  ]

  const handleOnCellClick = (params) => {
    if(params.row){
      setCurrentExpense(params.row);
      setEditExpense(true);
    }
  }

  


    const addExpense = async (expenseData) => {
      const response = await fetch("/api/expenses/addExpense", {
        method: "POST",
        body: JSON.stringify(expenseData),
        headers: 
        {
          "Content-Type": 
          "application/json",
        },
      });
      const data = await response;
      if(data.status === 200){
        refreshPage();
      }
      }

    const deleteExpense = async () => {
      console.log(currentExpense);
      if(currentExpense._id){
        const response = await fetch("/api/expenses/deleteExpense", {
          method: "POST",
          body: JSON.stringify(currentExpense),
          headers:
          {
            "Content-Type":
            "application/json",
          },
        });
        const data = await response;
        if(data.status === 200){
          refreshPage();
        }
    }
    }

    const updateExpense = async () => {
      if(currentExpense._id){
        const response = await fetch("/api/expenses/editExpense", {
          method: "POST",
          body: JSON.stringify(currentExpense),
          headers:
          {
            "Content-Type":
            "application/json",
          },
        });
        const data = await response;
        if(data.status === 200){
          refreshPage();
        }
      }
    }

    function refreshPage() {
      setTimeout(() => {
        refreshData();
        setProduct('');
        setPrice('');
        setVendor('');
        setEditExpense(false);
        setOpenedExpense(false);
        setopenEditExpense(false);
      }, 300);
    }

   return (
     <div className="flex flex-col items-center w-screen">
        <Card className="w-5/6 mb-5 text-center" variant="outlined" style={{marginTop: '1rem'}}>
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Expenses
        </Typography>
        <Typography className='tracking-wider' variant="body2">
         ${parseFloat(sum).toFixed(2)}
        </Typography>
      </CardContent>
        </Card>
    <div style={{height: '65vh'}} className="x-5 mb-3 w-5/6">
      <DataGrid
        getRowId={(row) => row._id}
        rows={rowsTwo}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        onCellClick={handleOnCellClick}
      />
    </div>
    <Button style={{backgroundColor:  '#FFC0CB', fontWeight: 'bold'}} variant="contained" onClick={() => setOpenedExpense(true)}>Add Expense</Button>
  <Modal
        opened={openedExpense}
        onClose={() => setOpenedExpense(false)}
      >
        <div className="flex flex-col space-y-3 items-center justify-center">
          <label className="">Product:</label>
          <TextInput variant="filled" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Products Purchased" />
          <label className="">Price:</label>
          <TextInput variant="filled" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
          <label className="">Vendor:</label>
          <TextInput variant="filled" value={vendor} onChange={(e) => setVendor(e.target.value)} placeholder="Vendor" />
          <Button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" onClick={() => {addExpense({product: product, price: parseFloat(price), vendor: vendor});}}>Add</Button>
        </div>
      </Modal>

    <Modal
      opened={openEditExpense}
      onClose={() => setopenEditExpense(false)}
    >
      
      <div className="flex flex-col space-y-3 items-center justify-center">
        <Text size='xl' className='font-bold'>Edit Expense</Text>
        <label className="">Product:</label>
        <TextInput variant="filled" value={currentExpense.product || ""} onChange={(e) => setCurrentExpense({...currentExpense, product: e.target.value || ""})} placeholder="Products Purchased" />
        <label className="">Price:</label>
        <TextInput variant="filled" value={currentExpense.price || ""} onChange={(e) => setCurrentExpense({...currentExpense, price: e.target.value || ""})} placeholder="Price" />
        <label className="">Vendor:</label>
        <TextInput variant="filled" value={currentExpense.vendor || ""} onChange={(e) => setCurrentExpense({...currentExpense, vendor: e.target.value || ""})} placeholder="Vendor" />
        <Button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" onClick={() => {updateExpense({product: product, price: parseFloat(price), vendor: vendor});}}>Edit</Button>
      </div>
    </Modal>

    <Modal
      opened={editExpense}
      onClose={() => setEditExpense(false)}
    >
      <div className="flex flex-row m-12 items-center justify-around">
        <Text onClick={() => {setopenEditExpense(true); setEditExpense(false);}} size="xl" className="flex flex-col items-center justify-center active:border-4 active:border-blue-500 p-5 active:rounded">
          Edit
          <PencilAltIcon className="h-12 w-12 text-blue-500" />
        </Text>
        <Text onClick={() => {deleteExpense();}} size="xl" className="flex flex-col items-center justify-center active:border-4 active:border-red-500 p-5 active:rounded">
          Delete
        <TrashIcon className="h-12 w-12 text-red-500" />
        </Text>
      </div>
    </Modal>
  </div>
   );
};

