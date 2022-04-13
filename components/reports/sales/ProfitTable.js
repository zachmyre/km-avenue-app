import { useState } from 'react';
import { useRouter } from 'next/router'
import { Modal, TextInput, Select, Text  } from '@mantine/core';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid';
import { Card, CardContent, Typography } from '@mui/material';


export default function ProfitTable({sales}){
    const router = useRouter();
    const refreshData = () => {
      router.replace(router.asPath);
    }

    const [customer, setCustomer] = useState('');
    const [price, setPrice] = useState('');
    const [product, setProduct] = useState('');
    const [formOfPayment, setFormOfPayment] = useState('');
    const [paid, setPaid] = useState('no');
    const [editSale, setEditSale] = useState(false);
    const [currentSale, setCurrentSale] = useState({});
    const [openedSale, setOpenedSale] = useState(false);
    const [openEditSale, setOpenEditSale] = useState(false);

    const rowsTwo = (sales && sales.length > 0) ? reverseArr(sales) : [];

    function reverseArr(input) {
      var ret = new Array;
      for(var i = input.length-1; i >= 0; i--) {
          ret.push(input[i]);
      }
      return ret;
  }

  const sum = sales.reduce((total, sale) => {
    return total + parseFloat(sale.price);
  }, 0);

  const columns = [
    { field: 'customer', headerName: 'Customer', flex:1, minWidth: 50 },
    { field: 'product', headerName: 'Product', flex:1, minWidth: 50 },
    { field: 'price', headerName: 'Price', flex:1, minWidth: 50 },
    { field: 'formOfPayment', headerName: 'Payment', flex:1, minWidth: 50 },
    { field: 'paid', headerName: 'Paid', flex:1, minWidth: 50 },
  ]

  const handleOnCellClick = (params) => {
    if(params.row){
      setCurrentSale(params.row);
      setEditSale(true);
    }
  }

  


    const addExpense = async (expenseData) => {
      console.log(expenseData);
      const response = await fetch("/api/sales/addSale", {
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

    const deleteSale = async () => {
      console.log(currentSale);
      if(currentSale._id){
        const response = await fetch("/api/sales/deleteSale", {
          method: "POST",
          body: JSON.stringify(currentSale),
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

    const updateSale = async () => {
      if(currentSale._id){
        const response = await fetch("/api/sales/editSale", {
          method: "POST",
          body: JSON.stringify(currentSale),
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
        setCustomer('');
        setPrice('');
        setProduct('');
        setFormOfPayment('');
        setPaid('no');
        setCurrentSale({});
        setEditSale(false);
        setOpenedSale(false);
        setOpenEditSale(false);
      }, 300);
    }

   return (
     <div className="flex flex-col items-center w-screen mb-3">
        <Card className="w-5/6 mb-5 text-center" variant="outlined" style={{marginTop: '1rem'}}>
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Sales
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
    <Button style={{backgroundColor:  '#FFC0CB', fontWeight: 'bold'}} variant="contained" onClick={() => setOpenedSale(true)}>Add Sale</Button>
  <Modal
        opened={openedSale}
        onClose={() => setOpenedSale(false)}
      >
        <div className="flex flex-col space-y-3 items-center justify-center">
        <label className="">Customer:</label>
        <TextInput variant="filled" value={customer || ""} onChange={(e) => setCustomer(e.target.value)} placeholder="Customer" />
        <label className="">Price:</label>
        <TextInput variant="filled" value={price || ""} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
        <label className="">Product:</label>
        <TextInput variant="filled" value={product || ""} onChange={(e) => setProduct(e.target.value)} placeholder="Product" />
        <label className="">Payment:</label>
        <TextInput variant="filled"  value={formOfPayment || ""} onChange={(e) => setFormOfPayment(e.target.value)} placeholder="Payment" />
        <label className="">Paid (yes or no):</label>
        <TextInput variant="filled" value={paid || ""} onChange={(e) => setPaid(e.target.value)} placeholder="true" />
        <Button style={{backgroundColor:  '#FFC0CB', fontWeight: 'bold'}} variant="contained" onClick={() => {addExpense({customer: customer, price: parseFloat(price), product: product, formOfPayment: formOfPayment, paid: paid});}}>Add</Button>
        </div>
      </Modal>

    <Modal
      opened={openEditSale}
      onClose={() => {
        setCurrentSale({});
        setOpenEditSale(false);
        }}
    >
      
      <div className="flex flex-col space-y-3 items-center justify-center">
        <Text size='xl' className='font-bold'>Edit Sale</Text>
        <label className="">Customer:</label>
        <TextInput variant="filled" value={currentSale.customer || ""} onChange={(e) => setCurrentSale({...currentSale, customer: e.target.value || ""})} placeholder="Customer" />
        <label className="">Price:</label>
        <TextInput variant="filled" value={currentSale.price || ""} onChange={(e) => setCurrentSale({...currentSale, price: e.target.value || ""})} placeholder="Price" />
        <label className="">Product:</label>
        <TextInput variant="filled" value={currentSale.product || ""} onChange={(e) => setCurrentSale({...currentSale, product: e.target.value || ""})} placeholder="Product" />
        <label className="">Payment:</label>
        <TextInput variant="filled" value={currentSale.formOfPayment || ""} onChange={(e) => setCurrentSale({...currentSale, formOfPayment: e.target.value || ""})} placeholder="Payment" />
        <label className="">Paid (yes or no):</label>
        <TextInput variant="filled" value={currentSale.paid || ""} onChange={(e) => setCurrentSale({...currentSale, paid: e.target.value || ""})} placeholder="true" />
        <Button style={{backgroundColor:  '#FFC0CB', fontWeight: 'bold'}} variant="contained" onClick={() => {updateSale({customer: customer, price: parseFloat(price), product: product, formOfPayment: formOfPayment, paid: paid});}}>Edit</Button>
      </div>
    </Modal>

    <Modal
      opened={editSale}
      onClose={() => setEditSale(false)}
    >
      <div className="flex flex-row m-12 items-center justify-around">
        <Text onClick={() => {setOpenEditSale(true); setEditSale(false);}} size="xl" className="flex flex-col items-center justify-center active:border-4 active:border-blue-500 p-5 active:rounded">
          Edit
          <PencilAltIcon className="h-12 w-12 text-blue-500" />
        </Text>
        <Text onClick={() => {deleteSale();}} size="xl" className="flex flex-col items-center justify-center active:border-4 active:border-red-500 p-5 active:rounded">
          Delete
        <TrashIcon className="h-12 w-12 text-red-500" />
        </Text>
      </div>
    </Modal>
  </div>
   );
};

