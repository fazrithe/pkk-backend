import express from "express";

import Users from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async(req, res) => {
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

export const Login =  async(req, res) => {
    var response = { 
      status: 400,
      msg: '',
      token: '',
    }
    
    var email = req.body.email;
    var password = req.body.password;
    try {
      if (email.trim() === "" || password.trim() === "" || email == null || password == null) {
        throw new Error('Email and password are required.');
      }
      
      const user = await Users.findOne({ where: { email: email } });
  
      if (user == null) {
        throw new Error('Sorry, your email was incorrect. Please double-check your email.');
      }
  
      const isValid = await bcrypt.compareSync(password, user.password);
  
      if (! isValid) {
        throw new Error('Sorry, your password was incorrect. Please double-check your password.');
      }
      let token = jwt.sign({ id: user.id, email: user.email, username: user.username }, process.env.PASSWORD_SECRET, { expiresIn: '1d' });
      await Users.update({refresh_token: token},{
        where:{
            id: user.id
        }
      });
      
      res.cookie('refreshToken', token,{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      });
      response.status = 200
      response.msg = 'Login success'
      response.token = token;
    } catch (error) {
      console.log('Something went wrong', error)
      response.msg = error.message
    }
  
    return res.status(response.status).send(response);
  }

  export const Logout = async(req, res) => {
    var response = { 
      status: 400,
      message: '',
      body: {}
    }
  
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
      where:{
        refresh_token:refreshToken
      }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token:null},{
      where:{
        id:userId
      }
    });
    res.clearCookie('refreshToken');
    return res.status(201).json({msg: "Logout success"});
  }