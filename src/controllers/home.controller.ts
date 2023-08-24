import { Request, Response } from "express";

export class HomeController {
  index(req: Request, res: Response): Response {
    return res.send('Properties API');
  }
}
