import { Request, Response } from "express";
import { loginSchema } from "../validations/auth.validation";
import * as authService from "../services/auth.service";
import { AuthRequest } from "../middleware/auth.middleware";

export async function login(req: Request, res: Response) {
  try {
    const body = loginSchema.parse(req.body);

    const result = await authService.login(
      body.email,
      body.password
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}




export async function me(req: AuthRequest, res: Response) {
  const user = await authService.me(req.user!.id);

  res.json({
    success: true,
    data: user,
  });
}