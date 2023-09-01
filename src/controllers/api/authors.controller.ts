import Author from "../../models/Author";
import { Request, Response } from "express";

export class AuthorsController {

  index(req: Request, res: Response) : void{
    Author.findAll().then((data)=>{
      return res.json({ data: data });
    });
  }

  create(req: Request, res: Response): void {
    Author.create(req.body).then((data)=>{
      return res.json({ data: data});
    })
  }

  getOne(req: Request, res: Response) : void{
    Author.findByPk(req.params.id).then((data)=>{
      return res.json({ data: data});
    })
  }

  update(req: Request, res: Response): void {
    Author.findByPk(req.params.id).then((author)=>{
      if(author){
        author.update(req.body)
        Author.findByPk(req.params.id).then((data)=>{
          return res.json({ data: data});
        })
      }
      else{
        return res.json({ message: "author not found" });
      }
    })
  }

  delete(req: Request, res: Response): void {
    Author.findByPk(req.params.id).then((author)=>{
      if(author){
        author.destroy()
        return res.json({ message: "author deleted" });
      }
      else{
        return res.json({ message: "author not found" });
      }
    })
  }
}
