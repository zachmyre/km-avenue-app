import clientPromise from "../../lib/mongodb"

export default async (req, res) => {
    const {customer, product, price, formOfPayment, paid} = req.body;
    const client = await clientPromise;

    const db = client.db("km-avenue");

    let sale = await db.collection("sales").insertOne({customer, product, price, formOfPayment, paid});
    res.status(200).json(sale)
  }
  