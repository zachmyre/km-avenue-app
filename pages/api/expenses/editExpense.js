import clientPromise from "../../../lib/mongodb"
import { ObjectId } from "mongodb";

export default async (req, res) => {
    const {_id, product, price, vendor} = req.body;
    const client = await clientPromise;

    const db = client.db("km-avenue");

    let expense = await db.collection("expenses").updateOne({_id: ObjectId(_id)}, {$set: {product, price, vendor}});
    res.status(200).json(expense)
  }
  