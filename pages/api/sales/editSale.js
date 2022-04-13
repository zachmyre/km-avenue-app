import clientPromise from "../../../lib/mongodb"
import { ObjectId } from "mongodb";

export default async (req, res) => {
    const {_id, product, price, customer, formOfPayment, paid} = req.body;
    const client = await clientPromise;

    const db = client.db("km-avenue");

    let expense = await db.collection("sales").updateOne({_id: ObjectId(_id)}, {$set: {customer, product, price, formOfPayment, paid}});
    res.status(200).json(expense)
  }
  