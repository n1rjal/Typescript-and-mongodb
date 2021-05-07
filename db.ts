import mongodb, { ChangeStream, MongoClient } from "mongodb";

let client: any;
async function main() {
  const db: any = client.db("task").collection("tasks");
  return db;
}

const connectDB = async () => {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/drivers/node/ for more details
   */
  const uri = "mongodb://127.0.0.1";

  /**
   * The Mongo Client you will use to interact with your database
   * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
   */
  client = new MongoClient(uri, { useUnifiedTopology: true });

  // Connect to the MongoDB cluster
  await client.connect();
};

connectDB();

export default main;
