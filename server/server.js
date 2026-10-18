require("dotenv").config();
const { MongoClient, Code } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URI);
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
    res.json({
        message: "Server is running"
    });
});

app.listen(9000, () => {
    console.log("Server running on port 9000");
});

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    console.log(`[API] (POST /api/login) Received login request for email: ${email}`);

    if (!email || !password ||
        typeof email !== 'string' || typeof password !== 'string' ||
        email.trim() === '' || password.trim() === '')
    {
        console.warn(`[API] (POST /api/login) Login failed for email: ${email}`);
        return res.status(400).json({ message: "Email and password are required" });
    }
    
    let result;
    try {
        result = await users.findOne({ email: email });
    } catch (e) {
        console.warn(`[API] (POST /api/login) Login failed for email: ${email}`);
        console.error(e);
        return res.status(500).json({ message: "An internal error occured"})
    }

    let pwdMatch;
    if (result)
        pwdMatch = await verifyPassword(password, result.password);
    
    if (result === null || !pwdMatch) {
        console.warn(`[API] (POST /api/login) Login failed for email: ${email}`);
        return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log(`[API] (POST /api/login) Login successful for email: ${email}`);
    return res.status(200).json({ message: "Login successful" });
});

app.post("/api/signup", async (req, res) => {
    const { email, password } = req.body;
    console.log(`[API] (POST /api/signup) Received signup request for email: ${email}`);

    if (!email || !password ||
        typeof email !== 'string' || typeof password !== 'string' ||
        email.trim() === '' || password.trim() === '')
    {
        console.warn(`[API] (POST /api/signup) Signup failed for email: ${email}`);
        return res.status(400).json({ message: "Email and password are required" });
    }
    
    // Add any additional password verification

    let result;
    try {
        result = await users.findOne({ email: email });
    } catch (e) {
        console.warn(`[API] (POST /api/signup) Signup failed for email: ${email}`);
        console.error(e);
        return res.status(500).json({ message: "An internal error occured"})
    }
    
    if (result !== null) {
        console.warn(`[API] (POST /api/signup) Signup failed for email: ${email}`);
        return res.status(409).json({ message: "User already exists" });
    }

    try {
        result = await users.insertOne({
            email: email,
            password: await hashPassword(password)
        });
    } catch (e) {
        console.warn(`[API] (POST /api/signup) Signup failed for email: ${email}`);
        console.error(e);
        return res.status(500).json({ message: "An internal error occured"})
    }

    console.log(`[API] (POST /api/signup) Signup successful for email: ${email}`);
    return res.status(200).json({ message: "Signup successful" });
})

// Password hashing function
async function hashPassword(password) {
    const hash = await bcrypt.hash(password, 12);
    if (!hash) {
        console.error("Error hashing password");
        return null; 
    } 

    return hash;
}

async function verifyPassword(password, hash) {
    return isMatch = await bcrypt.compare(password, hash)
}

async function connectDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

    } catch (error) {
        console.error("Could not connect to MongoDB");
        console.error(error);
    }
}
// make me a fake hash
async function generateFakeHash() {
    const fakePassword = "myGreatPassword67";
    const fakeHash = await hashPassword(fakePassword);
    console.log("Fake hash for testing:", fakeHash);
}

connectDatabase();

const db = client.db("PA2");
const users = db.collection("users");


