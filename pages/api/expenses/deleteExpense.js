import clientPromise from "../../../lib/mongodb"
import { ObjectId } from "mongodb";

export default async (req, res) => {
    const {_id} = req.body;
    const client = await clientPromise;

    const db = client.db("km-avenue");
    let expense = await db.collection("expenses").deleteOne({_id: ObjectId(_id)});
    res.status(200).json(expense)
  }
  