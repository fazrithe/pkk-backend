import Institutions from "../models/InstitutionModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const getInstitutions = async(req, res) => {
    try{
        const institutions = await Institutions.findAll({
            attributes:['id','name','address']
        });
        res.json(institutions);
    }catch(error){
        console.log(error);
    }
}

export const addInstitutions = async(req, res) => {
    const {name, address} = req.body;
    try{
        await Institutions.create({
            name: name,
            address: address
        });
        res.status(201).json({msg: "Institusi berhasil tersimpan"});
    }catch (error){
        console.log(error);
    }
}