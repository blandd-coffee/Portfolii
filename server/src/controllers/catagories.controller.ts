import { type Request, type Response } from "express";
import { Catagory } from "../models/catagories.model.js";

async function getAllCatagories(req: Request, res: Response) {
  try {
    const catagories = await Catagory.find();
    res.status(201).json(catagories);
  } catch (err) {
    console.error(err);
  }
}
async function postCatagory(req: Request, res: Response) {
  try {
    const { name, imageURI } = req.body;
    const catagory = new Catagory({ name, imageURI });
    catagory.save();

    res.status(201).json({ data: "Success!" });
  } catch (err) {
    console.error(err);
  }
}

export default { getAllCatagories, postCatagory };
