import Author from '../../../models/author';
import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { injectable } from 'inversify';
import { AuthorIdRequest, StoreAuthorRequest, UpdateAuthorRequest } from '../../../validators/author.validator'
import modelDecorator from '../../../services/model-binding'
import validateDecorator from '../../../validators'
import IResourceController from '../../resource.controller.interface';
import IAuthor from '../../../models/author.shape';
import { ModelRequest } from '../../../types/requests';

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
  @modelDecorator(Author, 'id')
  async show(req: ModelRequest, res: Response, next: NextFunction){
    res.status(StatusCodes.OK).json({ data: req.model});
  }

  @validateDecorator(AuthorIdRequest, "params")
  @validateDecorator(UpdateAuthorRequest, "body")
  @modelDecorator(Author, 'id')
  async update(req: ModelRequest, res: Response, next: NextFunction) {
    try{
      //get data
      let authorUpdate: Partial<IAuthor> = {}
      if(req.body?.name){
        authorUpdate.name = req.body.name
      }

      //save the data
      req.model.update(authorUpdate)
      req.model.save()

      //return response
      return res.status(StatusCodes.NO_CONTENT).json({ message: ReasonPhrases.NO_CONTENT });
    }
    catch(error){
      next(error)
    }
  }

  @validateDecorator(AuthorIdRequest, "params")
  @modelDecorator(Author, 'id')
  async delete(req: ModelRequest, res: Response, next: NextFunction) {
    try{
      //destroy the model
      req.model.destroy()
      res.status(StatusCodes.NO_CONTENT).json({ message: ReasonPhrases.NO_CONTENT });
    }
    catch(error){
      next(error)
    }
  }
}


