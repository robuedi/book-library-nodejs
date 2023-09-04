import IResourceController from "../../controllers/resource.controller.interface";
import express, { Router } from 'express';
import { ResourceRouteMethods } from "../../types/global";

export default class ResourceRouter {
    private baseRoute: string;
    private controller: IResourceController;
    private _router: Router;

    constructor(baseRoute: string, controller: IResourceController) {
        this.baseRoute = baseRoute;
        this.controller = controller;
        this._router = express.Router();
    }

    get router() {
        return this._router;
    }

    private addRoute(routeCallback: ResourceRouteMethods, route: string, handler: keyof IResourceController) {
        //check if we have the methods in controller
        if (!(handler in this.controller) || typeof this.controller[handler] !== 'function') {
            throw new Error(`${handler} function missing for ${this.baseRoute} route in class ${this.controller.constructor.name}`);
        }

        this._router[routeCallback](`${this.baseRoute}${route}`, this.controller[handler] as any);
        return this;
    }

    public index() {
        return this.addRoute('get', '', 'index');
    }

    public show() {
        return this.addRoute('get', '/:id', 'show');
    }

    public store() {
        return this.addRoute('post', '', 'store');
    }

    public update() {
        return this.addRoute('put', '/:id', 'update');
    }

    public delete() {
        return this.addRoute('delete', '/:id', 'delete');
    }
}