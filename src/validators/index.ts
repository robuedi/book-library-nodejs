import { ValidationError, validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export default function validateDecorator<T extends object>(dtoClass: new () => T, property: string) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;
  
      descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
        const dtoInstance = new dtoClass();
        const requestBody: any = {
          body: req.body,
          query: req.query,
          params: req.params,
        };
        Object.assign(dtoInstance, requestBody[property]);
        requestBody[property] = dtoInstance;
        const errors: ValidationError[] = await validate(dtoInstance, {
          forbidUnknownValues: true,
          whitelist: true,
          forbidNonWhitelisted: true,
        });
  
        if (errors.length > 0) {
          const validationErrors = errors.map((error) => ({
            [error.property]: Object.values(error.constraints || {}),
          }));
  
          const errorMessage = "Invalid data provided";
          const errorResponse = { message: errorMessage, errors: validationErrors };
  
          return res.status(422).json(errorResponse);
        }
  
        return originalMethod.call(this, req, res, next);
      };
  
      return descriptor;
    };
  }
  