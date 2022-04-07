import { Head, Image } from 'next'
import styles from '../../styles/Home.module.css'
import clientPromise from '../../lib/mongodb'
import Navbar from '../../components/navigation/Navbar'
import ExpenseTable from '../../components/reports/expenses/ExpenseTable';
import ProfitTable from '../../components/reports/sales/ProfitTable';

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
