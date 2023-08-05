import { Request, Response } from "express";
const { fetchUserPassword, registerUser } = require("../model/Auth");
const { hashingPassword, jwtSign, compareCheck } = require("../service/auth");

export class AuthController {
  async register(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { name, email, password } = req.body;
    try {
      const hashedPassword = await hashingPassword(password);

      if (!hashedPassword) throw new Error("failed to hash the password");

      const user = await registerUser(name, email, hashedPassword);

      if (!user) throw new Error("this register does not success");

      res.status(201).json({
        message: "this register user is success",
        user,
      });
    } catch (error: any) {
      res.json({
        message: error.message,
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const existedUserPassword = await fetchUserPassword(email);

      if (existedUserPassword === null) throw new Error("this password does not exist");

      const isMatchUser = await compareCheck(password, existedUserPassword);

      if (isMatchUser === false) throw new Error("failed to compare with password");

      const token = await jwtSign(email);

      if (!token) throw new Error("failed to issue token");

      res.cookie("jwtToken", token, { httpOnly: true });
      res.status(201).json({
        message: "login success",
        token,
      });
    } catch (error: any) {
      res.json({
        message: error.message,
      });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      res.clearCookie("jwtToken", {
        httpOnly: true
      });

      res.status(200).json({ message: "Logout success" });
    } catch (error) {
      throw new Error("Logout failed");
    }
  }
}
