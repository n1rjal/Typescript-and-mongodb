import express, { json, NextFunction, Response, Request } from "express";
import {
  create,
  taskModelInterface,
  find,
  findOne,
  update,
  deleteOne,
} from "./models/taskModel";
import { ObjectId } from "mongodb";

const app = express();
app.use(json());

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const allTasks: taskModelInterface[] = await find({});
  return res.status(200).send(allTasks);
});

app.post("/create", async (req: Request, res: Response, next: NextFunction) => {
  const taskCreated: taskModelInterface = { ...req.body };
  const task: any = await create(taskCreated);
  res.status(200).send(task);
});

app.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const updatedPost = await findOne(new ObjectId(req.params.id));
  res.status(200).send(updatedPost);
});

app.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const updatedPost = await update(new ObjectId(req.params.id), {
    ...req.body,
  });
  res.status(200).send(updatedPost);
});

app.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedPost = await deleteOne(new ObjectId(req.params.id));
    res.status(200).send(updatedPost);
  } catch (e: any) {
    res.status(400).send(e);
  }
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
