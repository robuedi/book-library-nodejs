import Author from '../../models/Author';
import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export class AuthorsController {

  async index(req: Request, res: Response, next: NextFunction){
    try{
      const authors = await Author.findAll()
      res.status(StatusCodes.OK).json({ data: authors ? authors : [] });
    }
    catch(error){
      next(error)
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try{
      let {name} = req.body
      const author = await Author.create({name})
      res.status(StatusCodes.CREATED).json({ data: author});
    }
    catch(error){
      next(error)
    }
  }

  async show(req: Request, res: Response, next: NextFunction){
    try{
      const author = await Author.findByPk(req.params.id)
      res.status(StatusCodes.OK).json({ data: author});
    }
    catch(error){
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try{
      let {name} = req.body
      await Author.update({ name }, {
        where: { id: req.params.id }
      });
      return res.status(StatusCodes.NO_CONTENT).json({ message: ReasonPhrases.NO_CONTENT });
    }
    catch(error){
      next(error)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try{
      await Author.destroy({
        where: { id: req.params.id }
      });
      res.status(StatusCodes.NO_CONTENT).json({ message: ReasonPhrases.NO_CONTENT });
    }
    catch(error){
      next(error)
    }
  }
}
