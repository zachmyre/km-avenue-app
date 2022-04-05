import clientPromise from "../../lib/mongodb"

export default async (req, res) => {
    const {product, price, vendor} = req.body;
    const client = await clientPromise;

    const db = client.db("km-avenue");

    let expense = await db.collection("expenses").insertOne({product, price, vendor});
    res.status(200).json(expense)
  }
  