import styles from '../../styles/Home.module.css'
import { useEffect, useState } from 'react';

export default function Home({expenses, sales}) {

    const [quotes, setQuotes] = useState('');

    useEffect(() => {
      const getDataFromAPI = async () => {
        const data = await fetch('https://type.fit/api/quotes');
        const dataJSON = await data.json();
        const randomNumber = Math.round(Math.random() * dataJSON.length);
        setQuotes(dataJSON[randomNumber]);
      }
      getDataFromAPI();
    }, []);


  return (
      <>
    <div className="flex flex-col items-center justify-center w-100">
      {quotes?.text ? 
      <div className="text-center space-y-5 mx-6 my-5 rounded bg-[#FFC0CB] p-8">
        <h1 className="text-black font-bold text-4xl">Quote of the Day</h1>
        <div className="text-black italic text-xl">
          {quotes.text}
          </div>
        </div> 
        : 
        <h2>
          Loading...
          </h2>}
    </div>
    </>
  )
}


// export async function getStaticPaths() {
//   try {
//     const client = await clientPromise;

//     const db = client.db("km-avenue");

//     let expenses = await db.collection("expenses").find({}).toArray();
//     expenses = JSON.parse(JSON.stringify(expenses));
//     let sales = await db.collection('sales').find({}).toArray();
//     sales = JSON.parse(JSON.stringify(sales));

//     return {
//       props: { isConnected: true, expenses: expenses, sales: sales},
//     }
//   } catch (e) {
//     console.error(e)
//     return {
//       props: { isConnected: false },
//     }
//   }
// }
