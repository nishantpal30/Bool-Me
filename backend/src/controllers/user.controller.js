
import { registerService } from "../services/register.service.js";

export const registerUser = async (req, res) => {
  try {
    const registerResponse = await registerService(req.body);
    return res
    .status(registerResponse.statusCode)
    .json(registerResponse);
  } catch {
     return res.status(StatusCodes.BAD_REQUEST).json({
            message: error.message,
            success: false
        });
  }
};
