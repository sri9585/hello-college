const express = require("express")

const User = require('../models/studentdata');

const sha = require('crypto')

const jsw = require("jsonwebtoken");

const authprocess = express.Router();

const auth = require('../constrints/auth.js')

authprocess.post('/auth/student/signup',async(req,res)=>{
    try{
        const { name, rollNo, department, password} = req.body;

        const existingUser = await User.findOne({rollNo});

        if(existingUser){
            res.status(404).send("Roll Number Already Exist")
        }
        if (!name || !rollNo || !department|| !password) {
            res.status(404).send(
            "All field are manditory",
            );
        }
    findHash = sha.createHash("sha512").update(password).digest("hex")

    let student = new User(
        {
            name,
            rollNo,
            department,
            password:findHash,
        }
    );
    student = await student.save();
    res.json('Student Account Created');

    }
    catch(error){
        res.status(500).send(
            'error'
        )
    }
})

//signin

authprocess.post('/auth/student/signin',async (req,res)=>{
    try{
        const {rollNo,password} = req.body
        const user = await User.findOne({rollNo})

        if(!user){
            res.status(404).send("Student Doesn\'t Exist")
        }

        const ismatch = sha.createHash("sha512").update(password).digest('hex');

        if (ismatch !== user.password) {
            return res.status(400).json("Password is incorrect" );
        }

        const token = jsw.sign({id:user._id},'passwordKey')
        res.json({token,...user._doc})
    }
    catch(e){

    }
});

authprocess.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);
        const verified = jsw.verify(token, "passwordKey");
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);
        res.json(true);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// get user data
authprocess.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({ ...user._doc, token: req.token });
  })

//get users id;
authprocess.get('/:id',async(req,res)=>{
User.findById(req.params.id)
.then(data=>res.json(data))
.catch(error=>res.json(error))
})


module.exports = authprocess;