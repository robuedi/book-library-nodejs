import Author from '../../../models/author';
import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { injectable } from 'inversify';
import { AuthorIdRequest, StoreAuthorRequest, UpdateAuthorRequest } from '../../../validators/author.validator'
import validateDecorator from '../../../validators'
import IResourceController from '../../resource.controller.interface';
import IAuthor from '../../../models/author.shape';

@injectable()
export class AuthorsController implements IResourceController {

  async index(req: Request, res: Response, next: NextFunction){
    try{
      const authors = await Author.findAll()
      res.status(StatusCodes.OK).json({ data: authors ? authors : [] });
    }
    catch(error){
      next(error)
    }
  }

  @validateDecorator(StoreAuthorRequest, "body")
  async store(req: Request, res: Response, next: NextFunction) {
    try{
      const author = await Author.create({name: req.body.name})
      res.status(StatusCodes.CREATED).json({ data: author});
    }
    catch(error){
      next(error)
    }
  }

  @validateDecorator(AuthorIdRequest, "params")
  async show(req: Request, res: Response, next: NextFunction){
    try{
      const author = await Author.findByPk(req.params.id)
      res.status(StatusCodes.OK).json({ data: author});
    }
    catch(error){
      next(error)
    }
  }

  @validateDecorator(UpdateAuthorRequest, "body")
  @validateDecorator(AuthorIdRequest, "params")
  async update(req: Request, res: Response, next: NextFunction) {
    try{
      let authorUpdate: Partial<IAuthor> = {}
      if(req.body?.name){
        authorUpdate.name = req.body.name
      }

      await Author.update(authorUpdate, {
        where: { id: req.params.id }
      });
      return res.status(StatusCodes.NO_CONTENT).json({ message: ReasonPhrases.NO_CONTENT });
    }
    catch(error){
      next(error)
    }
  }

  @validateDecorator(AuthorIdRequest, "params")
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


