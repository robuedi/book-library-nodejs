import { Request, Response } from "express";

export class HomeApiController {
  index(req: Request, res: Response): Response {
    return res.json({ message: "API homepage" });
  }
}
