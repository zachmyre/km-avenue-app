import { useState } from 'react';
import { Table } from '@mantine/core';
import styles from '../../styles/Table.module.css'
import { Button, Modal, TextInput, Select, Card, Image, Text, Badge, Group  } from '@mantine/core';


export default function ProfitTable({sales}){

    const [customer, setCustomer] = useState('');
    const [price, setPrice] = useState('');
    const [product, setProduct] = useState('');
    const [formOfPayment, setFormOfPayment] = useState('');
    const [paid, setPaid] = useState('');
    const [filterNumber, setFilterNumber] = useState(-5);

    const [opened, setOpened] = useState(false);

    const filteredSales = sales.slice(filterNumber)
    const rows = filteredSales.map((sale) => {
        if(sale.paid){
            return(
                <tr key={sale._id}>
                    <td className="bg-green-300">{sale.customer}</td>
                    <td className="bg-green-300">{sale.price}</td>
                    <td className="bg-green-300">{sale.product}</td>
                    <td className="bg-green-300">{sale.formOfPayment}</td>
                </tr>
            )
        
        } else {
            return(
            <tr key={sale._id}>
                <td className="bg-red-300">{sale.customer}</td>
                <td className="bg-red-300">{sale.price}</td>
                <td className="bg-red-300">{sale.product}</td>
                <td className="bg-red-300">{sale.formOfPayment}</td>
            </tr>
            )
        
        }
    });

    const sum = sales.reduce((total, sale) => {
      return total + sale.price;
    }, 0);

    const paidSales =  sales.filter(sale => sale.paid);
    const paidSum = paidSales.reduce((total, sale) => {
        return total + sale.price;
      }, 0);

    const addSale = async (saleData) => {
      const response = await fetch("/api/addSale", {
        method: "POST",
        body: JSON.stringify(saleData),
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
     <div className="flex flex-col items-center justify-center w-screen mt-5">
    <div className="-x-5 mb-3">
    <Card shadow="md" p="lg" className="flex flex-col items-center justify-center">
        <Text size="lg" className="m-2">
            Paid Sales: {parseFloat(paidSum).toFixed(2)}
        </Text>
        <Text size="lg" className="m-2">
          Total Sales: {parseFloat(sum).toFixed(2)}
        </Text>
      </Card>
    </div>
    <Button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" onClick={() => setOpened(true)}>Add Sale</Button>
    <Select
    className="mx-16 my-3"
      label="Filter sales"
      placeholder="5"
      data={[
        { value: -5, label: '5' },
        { value: -10, label: '10' },
        { value: -20, label: '20' },
        { value: -50, label: '50' },
        { value: 0, label: 'All' },
      ]}
      onChange={(e) => setFilterNumber(e)}
      />
    <Table striped highlightOnHover fontSize="sm" horizontalSpacing="lg" verticalSpacing="md"
    className=""
    >
      <caption className={styles.caption}>Sales Report</caption>
    <thead>
      <tr >
        <th>Customer</th>
        <th>Price</th>
        <th>Product</th>
        <th>Payment</th>
      </tr>
    </thead>
    <tbody>{rows}</tbody>
  </Table>
  <Modal
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <div className="flex flex-col space-y-3 items-center justify-center">
          <label className="">Customer:</label>
          <TextInput variant="filled" value={customer} onChange={(e) => setCustomer(e.target.value)} placeholder="Customer" />
          <label className="">Price:</label>
          <TextInput variant="filled" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} placeholder="Price" />
          <label className="">Product:</label>
          <TextInput variant="filled" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Product" />
          <label className="">Form of Payment:</label>
          <TextInput variant="filled" value={formOfPayment} onChange={(e) => setFormOfPayment(e.target.value)} placeholder="Form of Payment" />
          <label className="">Paid:</label>
          <Select
    className=""
      placeholder="Did they pay yet?"
      data={[
        { value: true, label: 'Yes' },
        { value: false, label: 'No' },
      ]}
      onChange={(e) => setPaid(e)}
      />
          <Button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded" onClick={() => addSale({customer: customer, price: price, product: product, formOfPayment: formOfPayment, paid: paid})}>Add</Button>
        </div>
      </Modal>
  </div>
   );
};

