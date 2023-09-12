import { NextFunction, Request, Response } from "express";
import { ModelRequest } from '../../types/requests'
import { Model} from "sequelize-typescript";

type ModelWithFindByPk = {
  findByPk: (id: any) => Promise<any>
};

export default function modelDecorator<ModelType extends ModelWithFindByPk>(modelClass: ModelType, idKey: string) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;
  
      descriptor.value = async function (req: ModelRequest, res: Response, next: NextFunction) {
        //check if we have the is param
        if(!(idKey in req.params)){
          return res.status(422).json({ message: "Item id missing"});
        }

        const modelInstance = await modelClass.findByPk(req.params[idKey])
        if(!modelInstance){
          return res.status(404).json({ message: "Item not found"});
        }

        req.model = modelInstance

        return originalMethod.call(this, req, res, next);
      };
  
      return descriptor;
    };
  }
  