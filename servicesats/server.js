const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const User = require("./user")


mongoose.connect(`mongodb+srv://thor:thor@cluster0.ib472.mongodb.net/test`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Database connected...")
    }).catch((error) => {
        console.log("Database Connecion error", error.message)
    })

app.use(express.json())


app.use(
    cors({
        origin: "*"
    })
)

app.post("/create", async (req, res) => {
    try {
        const { username, mobile, email } = req.body
        const user = await User.findOne({ username: username })
        if (user) {
            return res.status(400).json({ message: "Customer already registered" })
        }

        const _user = new User({
            user_id: Date.now().toString(35).toUpperCase(),
            username,
            mobile,
            email,
            process_id: Date.now().toString(35).toUpperCase(),
            createdOn: new Date().toLocaleString()
        })

        _user.save((error, data) => {
            if (error) {
                console.log("Error: ", error)
                return res.status(400).json({ message: "Somthing went wrong " })
            }
            if (data) {
                return res.status(200).json({ message: "Customer registered successfully" })
            }
        })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

// edit user
app.post('/edit', async (req, res) => {
    try {
        const { user_id, mobile, email } = req.body;
        User.updateOne({'user_id': user_id},
         {
            '$set':  {
                'mobile': mobile,
                'email': email
            }
        }).then(function(){
            return res.status(200).json({ message: "Customer updated successfully" })
        }).catch(function(error){
            return res.status(400).json({ message: error.message })
        });

    } catch (error) {

    }
});
// api for delete 
app.delete('/customer/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        await User.deleteOne({ user_id: user_id });
        return res.status(200).json({ message: "User Deleted.." })
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

app.get("/get_user", async (req, res) => {
    try {
        const query = req.query
        const user = await User.find(query)
        if (user) {
            return res.status(200).json({ data: user })
        }
    } catch (error) {
        console.log("Error: ", error)
        return res.status(400).json({ message: "Somthing went wrong " })
    }
})

app.listen(4000, () => {
    console.log(`Api server noe on port 4000`)
})