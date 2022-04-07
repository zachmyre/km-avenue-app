import styles from '../styles/Home.module.css'

//3wOX1ebcBP7mBr5o

export default function Home() {
  return (
    <div className={styles.container}>

    </div>
  )
}

// export async function getServerSideProps(context) {
//   try {
//     await clientPromise
//     // `await clientPromise` will use the default database passed in the MONGODB_URI
//     // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the folloing code:
//     //
//     // `const client = await clientPromise`
//     // `const db = client.db("myDatabase")`
//     //
//     // Then you can execute queries against your database like so:
//     // db.find({}) or any of the MongoDB Node Driver commands

//     return {
//       props: { isConnected: true },
//     }
//   } catch (e) {
//     console.error(e)
//     return {
//       props: { isConnected: false },
//     }
//   }
// }
