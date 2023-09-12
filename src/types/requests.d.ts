import { Request } from 'express'
import { Model } from 'sequelize-typescript';

export interface ModelRequest extends Request {
    model: Model
}