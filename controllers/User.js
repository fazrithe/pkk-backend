import Users from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const getUsers = async(req, res) => {
    try{
        const users = await Users.findAll({
            attributes:['id','name','username','email']
        });
        res.json(users);
    }catch(error){
        console.log(error);
    }
}

export const getUserById = async (req, res) => {
    const id = req.params.id;

    Users.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Tutorial with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Tutorial with id=" + id
        });
    }); 
}

export const addUsers = async(req,res) => {
    const {name, username, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan confrim password tidak cocok"});
    const salt = await bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    try{
        await Users.create({
            name: name,
            username: username,
            email: email,
            password: hashPassword
        });
        res.status(201).json({msg: "Register Berhasil"});
    } catch (error){
        console.log(error);
    }
}

export const updateUsers = async (req, res) => {
    try {
        await Users.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUsers = async (req, res) => {
    Users.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(function (deletedRecord) {
        if(deletedRecord === 1){
            res.status(200).json({msg:"Deleted successfully"});          
        }
        else
        {
            res.status(404).json({msg:"Data tidak ditemukan"})
        }
    })
    .catch(function (error){
        res.status(500).json(error);
    });
}