import Auth, { type IAuth } from "../models/Authmodel";
import { Request, Response } from "express";
import { comparePassword, hashPassword } from "../helper/password";
import { signJwt } from "../helper/token";

const authController = {
  registerUser: async (req: Request<{}, {}, IAuth>, res: Response) => {
    try {
      const { name, email, password, userType } = req.body;

      // Validate input
      if (!name || !email || !password || !userType) {
        return res.status(400).json({
          success: false,
          message: "Give all required fields",
        });
      }

      // Check if user exists
      const existUser = await Auth.findOne({ email });
      if (existUser) {
        return res.status(400).json({
          success: false,
          message: "User already exists!",
        });
      }

      // Hash password (use ~10 salt rounds)
      const hashed = await hashPassword(password);

      // Save new user
      const newUser = new Auth({
        name,
        email,
        password: hashed,
        userType,
      });
      await newUser.save();

      // Create token
      const token = await signJwt(email, name);

      return res.status(201).json({
        success: true,
        message: `${userType} created successfully`,
        token,
        user: {
          "name": name,
          "email": email,
          "userType": userType
        }
      });

    } catch (error: any) {
      console.error("Registration error:", error.message);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  // userData: async (req: Request, res: Response) => {
  //   try {
  //     const authHeader = req.headers.authorization;

  //     if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //       return res.status(401).json({ success: false, message: "No token provided" });
  //     }

  //     const token = authHeader.replace("Bearer ", "");
  //     const secret = process.env.JWT_SECRET || "your_secret_key";

  //     // Decode token
  //     const decoded = jwt.verify(token, secret) as JwtPayload;

  //     // Fetch user from DB
  //     const user = await Auth.findOne({ email: decoded.email }).select("-password");

  //     if (!user) {
  //       return res.status(404).json({ success: false, message: "User not found" });
  //     }

  //     return res.status(200).json({
  //       success: true,
  //       message: "User retrieved successfully",
  //       user,
  //     });
  //   } catch (error: any) {
  //     console.error("Error fetching user data:", error.message);
  //     return res.status(500).json({
  //       success: false,
  //       message: "Failed to retrieve user data",
  //       error: error.message,
  //     });
  //   }
  // },

  // login
  
  
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        res.status(400).json({ success: false, message: 'Give the field of email and password' })

      const existUser = await Auth.findOne({ email }) 

      if (!existUser)
        res.status(400).json({ success: false, message: 'Invalid email!' })

      console.log(existUser)

      console.log(password, existUser?.password)

      const comparepass = await comparePassword(password as string, existUser?.password as string)

      if (comparepass) {
        const user = await Auth.findOne({ email }).select(['name', 'email', 'userType', '_id']);

        const token = await signJwt(email as string, user?.name as string)

        res.status(200).json({ success: true, message: 'login success', user, token })
      }

    } catch (error: any) {

      console.error("Login error:", error.message);

      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
      
    }
  }
};

export default authController;
