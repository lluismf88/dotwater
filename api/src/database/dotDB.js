const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
    "mongodb+srv://lluismnd88:F1b3rp4rtY!@dw0.okph8.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

const getAllDots = async () => {
    try {
        await client.connect();
        const collection = client.db("dotwater").collection("dot");
        let findedDots = await collection.find().toArray();

        return findedDots;
    } finally {
        client.close();
    }
};

const getDotById = async (id) => {
    try {
        await client.connect();
        const collection = client.db("dotwater").collection("dot");
        let findedDots = await collection.findOne({ _id: new ObjectId(id) });

        return findedDots;
    } finally {
        client.close();
    }
};

const createNewDot = async (newDot) => {
    try {
        await client.connect();
        const collection = client.db("dotwater").collection("dot");
        const result = await collection.insertOne(newDot);

        return await getDotById(result.insertedId);
    } finally {
        client.close();
    }
};

module.exports = { getAllDots, getDotById, createNewDot };
