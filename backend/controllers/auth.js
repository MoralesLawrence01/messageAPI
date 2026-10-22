const user = require("../models/userSchema")
const bcrypt = require("bcryptjs")

const register = async (req, res) => {
    try{
        const users = await user.findOne({userName: req.body.userName})
        if(users){
            return res.json({
                message: "Username is already taken",
                ok: false
            })
        }

        const hashedPass = await bcrypt.hash(req.body.password, 10)
        const newUser =new  user({
            userName: req.body.userName,
            password: hashedPass
        })
        await newUser.save()
        return res.json({
            message: "Register Success",
            ok: true,
        })
    }
    catch{
        res.json({
            ok: false
        })
    }
}

const login = async (req, res) => {
    try{

        const currUser = await user.findOne({userName: req.body.username})

        if (currUser === null){
            return res.json({
                message: "Invalid username or password",
                ok: false
            })
        }

        const comparePass = await bcrypt.compare(
            req.body.password, currUser.password
        )
        if (comparePass){
            req.session.userId = currUser._id.toString()
            return res.json({
                message: "Login Success",
                ok: true,
                userId: req.session.userId
            })
        } else {
            return res.json({
                message: "Invalid username or password",
                ok: false
            })
        }
    }catch{
        res.json({
            message: "something went wrong",
            ok: false
        })
    }

}


module.exports = { register, login }