import { StatusCodes } from "http-status-codes";
import Service from "../db/models/service.js";

export const listof_Services = async (req, res) => {
  try {
    const services = await Service.find({
      userId: req.user.Id,
      isDeleted: { $ne: true },
    });
    return res.status(StatusCodes.CREATED).json(services);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
      success: false,
    });
  }
};

export const create_services = async (req, res) => {
  try {
    const { name, duration, price, description, icon } = req.body;
    if (!name || !duration) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Service name and duration is required!!",
      });
    }
    const service = await Service.create({
      userId: req.user.id,
      name,
      duration,
      price: price || 0,
      description: description || "",
      icon: icon || "C1.png",
    });
    return res.status(StatusCodes.CREATED).json({
        success:true,
        message:"Service is created succesfully",
        service,

    });
  } catch (error) {
     return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Service name and duration is required!!",
      });
  }
};



export const updateService = async (req, res) => {
  try {
    const updates = {};
    const allowedFields = ['name', 'duration', 'price', 'description', 'isActive', 'icon'];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const service = await Service.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id, isDeleted: { $ne: true } },
      updates,
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json({ message: 'Service updated', service });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteService = async (req , res)=>{
try {
    const service = await Service.findOneAndUpdate(
        {_id:req.params.id,userid:req.user.id,isDeleted:{$ne:true}},
        {isDeleted:true,isActive:false},
        {new:true}
    );
    if(!service){
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json({message:"Service is not exist!!"})
    };

} catch (error) {
     return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Service name and duration is required!!",
      });
  }
}

