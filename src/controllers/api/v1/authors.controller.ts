import Author from '../../../models/Author';
import { NextFunction, Request, Response } from "express";
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { JsonController, Param, Body, Get, Post, Put, Delete, HttpCode } from 'routing-controllers';

@JsonController('/api/v2/authors')
export default class AuthorsController {

  @Get()
  public async index(req: Request, res: Response){
    let prom = new Promise(async (resolve, reject)=>{
      let pp = await Author.findAll({ raw: true })
      resolve(pp)
    })
    // const authors =  Author.findAll().then((data)=>{

    // })
    return await prom
  }

  @Post()
  @HttpCode(StatusCodes.CREATED)
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

  @Get('/:id([0-9]+)')
  async show(req: Request, res: Response, next: NextFunction){
    try{
      const author = await Author.findByPk(req.params.id)
      res.status(StatusCodes.OK).json({ data: author});
    }
    catch(error){
      next(error)
    }
  }

  @Put('/:id([0-9]+)')
  @HttpCode(204)
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

  @Delete('/:id([0-9]+)')
  @HttpCode(204)
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
