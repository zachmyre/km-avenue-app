import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import clientPromise from '../../lib/mongodb'
import Navbar from '../../components/navigation/Navbar'
import ExpenseTable from '../../components/reports/ExpenseTable';
import ProfitTable from '../../components/reports/ProfitTable';
import useMemo from 'react';

export default function Home({isConnected, expenses, sales}) {
  return (
      <>
    <div className={styles.container}>

    <ExpenseTable expenses={expenses} />
    <ProfitTable sales={sales} />
    </div>
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const client = await clientPromise;

    const db = client.db("km-avenue");

    let expenses = await db.collection("expenses").find({}).toArray();
    expenses = JSON.parse(JSON.stringify(expenses));
    let sales = await db.collection('sales').find({}).toArray();
    sales = JSON.parse(JSON.stringify(sales));


    return {
      props: { isConnected: true, expenses: expenses, sales: sales },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}
