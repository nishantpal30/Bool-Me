import Availability from "../db/models/avalability.js";
import { StatusCodes } from "http-status-codes";
import { isValidTimeRange } from "../utils/time.js";

export const listAvailabilty = async (req, res) => {
  try {
    const availability = await Availability.find({
      userId: req.user.id,
    }).sort({
      dayofWeek: 1,
    });

    return res.status(StatusCodes.OK).json({
      availability,
      success: true,
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
      success: false,
    });
  }
};

export const saveAvailability = async (req, res) => {
  try {
    const { dayofWeek, slots } = req.body;
    if (dayofWeek === undefined || dayofWeek < 0 || dayofWeek > 6) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Valid day of week is required",
      });
    }
    const cleanedSlots = (slots || []).filter((slots) => {
      slots.startTime &&
        slots.endTime &&
        isValidTimeRange(slots.startTime, slots.endTime);
    });

    const availability = await Availability.findOneAndUpdate(
      { userId: req.user.id, dayofWeek },
      { slots: cleanedSlots },
      { new: true, upsert: true },
    );

    res.json({ message: "Availability saves", availability });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
      success: false,
    });
  }
};
