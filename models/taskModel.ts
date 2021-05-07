import mongodb, { ObjectId } from "mongodb";
import db from "../db";

enum priorityEnum {
  low,
  medium,
  high,
  very_high,
}

interface taskModelInterface {
  _id?: ObjectId;
  name: string;
  title: string;
  priority: priorityEnum;
}

export { taskModelInterface };
export { create, update, find, findOne, deleteOne };

async function create(task: taskModelInterface) {
  const data = await db();
  return new Promise((resolve, reject) => {
    data.insertOne(task, (err: Error, document: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(document.ops[0]);
      }
    });
  });
}

async function update(_id: ObjectId, task: taskModelInterface) {
  const data = await db();
  return new Promise((resolve, reject) => {
    data.findOneAndUpdate(
      { _id: _id },
      { ...task },
      { returnOriginal: true },
      (err: Error, document: taskModelInterface) => {
        if (err) reject(err);
        if (document) resolve(document);
      }
    );
  });
}

async function find(queryObject?: any) {
  const connection = await db();
  let response = await connection.find(queryObject || {}).toArray();
  return response;
}

async function findOne(_id: ObjectId) {
  const connection = await db();
  let response = await find({ _id });
  return response;
}

async function deleteOne(_id: ObjectId) {
  const connection = await db();
  let response = await connection.deleteOne({ _id: _id });
  return new Promise((resolve, reject) => {
    if (response.ok) {
      resolve(response.ok);
    } else {
      reject("Error occured");
    }
  });
}
