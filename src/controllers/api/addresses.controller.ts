import { Request, Response } from "express";

export class AddressesController {

  index(req: Request, res: Response) : Response{
    return res.json({ message: "API address index" });
  
  }

  create(req: Request, res: Response): Response {
    return res.json({ message: "API address create" });
  }

  getOne(req: Request, res: Response) : Response{
    return res.json({ message: "API address getOne" });
  
  }

  update(req: Request, res: Response): Response {
    return res.json({ message: "API address update" });
   
  }

  delete(req: Request, res: Response): Response {
    return res.json({ message: "API address delete" });
   
  }
}
