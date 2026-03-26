import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db;
  }
  
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI not defined in environment');
  }
  
  client = new MongoClient(uri);
  await client.connect();
  db = client.db("RealtyBuilder");
  console.log('Connected to MongoDB');
  
  return db;
}

export async function getUsersCollection() {
  const database = await connectToDatabase();
  return database.collection('users');
}

export async function getSitesCollection() {
  const database = await connectToDatabase();
  return database.collection('sites');
}
