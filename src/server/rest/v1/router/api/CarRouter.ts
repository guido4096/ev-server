/* eslint-disable @typescript-eslint/no-misused-promises */
import { RESTServerRoute, ServerAction } from '../../../../../types/Server';
import express, { NextFunction, Request, Response } from 'express';

import CarService from '../../service/CarService';
import RouterUtils from '../../../../../utils/RouterUtils';

export default class CarRouter {
  private router: express.Router;

  public constructor() {
    this.router = express.Router();
  }

  public buildRoutes(): express.Router {
    this.buildRouteGetCarCatalogs();
    this.buildRouteGetCarCatalog();
    this.buildRouteGetCarCatalogImages();
    this.buildRouteCarCatalogsSynchronize();
    this.buildRouteGetCarMakers();
    this.buildRouteCreateCar();
    this.buildRouteGetCars();
    this.buildRouteGetCar();
    this.buildRouteUpdateCar();
    this.buildRouteDeleteCar();
    return this.router;
  }

  private buildRouteGetCarCatalogs(): void {
    this.router.get(`/${RESTServerRoute.REST_CAR_CATALOGS}`, async (req: Request, res: Response, next: NextFunction) => {
      await RouterUtils.handleRestServerAction(CarService.handleGetCarCatalogs.bind(this), ServerAction.CAR_CATALOGS, req, res, next);
    });
  }

  private buildRouteGetCarCatalog(): void {
    this.router.get(`/${RESTServerRoute.REST_CAR_CATALOG}`, async (req: Request, res: Response, next: NextFunction) => {
      req.query.ID = req.params.id;
      await RouterUtils.handleRestServerAction(CarService.handleGetCarCatalog.bind(this), ServerAction.CAR_CATALOG, req, res, next);
    });
  }

  private buildRouteGetCarCatalogImages(): void {
    this.router.get(`/${RESTServerRoute.REST_CAR_CATALOG_IMAGES}`, async (req: Request, res: Response, next: NextFunction) => {
      req.query.ID = req.params.id;
      await RouterUtils.handleRestServerAction(CarService.handleGetCarCatalogImages.bind(this), ServerAction.CAR_CATALOG_IMAGES, req, res, next);
    });
  }

  private buildRouteCarCatalogsSynchronize(): void {
    this.router.put(`/${RESTServerRoute.REST_CAR_CATALOG_SYNCHRONIZE}`, async (req: Request, res: Response, next: NextFunction) => {
      await RouterUtils.handleRestServerAction(CarService.handleSynchronizeCarCatalogs.bind(this), ServerAction.CAR_CATALOG_SYNCHRONIZATION, req, res, next);
    });
  }

  private buildRouteGetCarMakers(): void {
    this.router.get(`/${RESTServerRoute.REST_CAR_MAKERS}`, async (req: Request, res: Response, next: NextFunction) => {
      await RouterUtils.handleRestServerAction(CarService.handleGetCarMakers.bind(this), ServerAction.CAR_MAKERS, req, res, next);
    });
  }

  private buildRouteCreateCar(): void {
    this.router.post(`/${RESTServerRoute.REST_CARS}`, async (req: Request, res: Response, next: NextFunction) => {
      await RouterUtils.handleRestServerAction(CarService.handleCreateCar.bind(this), ServerAction.CAR_CREATE, req, res, next);
    });
  }

  private buildRouteGetCars(): void {
    this.router.get(`/${RESTServerRoute.REST_CARS}`, async (req: Request, res: Response, next: NextFunction) => {
      await RouterUtils.handleRestServerAction(CarService.handleGetCars.bind(this), ServerAction.CARS, req, res, next);
    });
  }

  private buildRouteGetCar(): void {
    this.router.get(`/${RESTServerRoute.REST_CAR}`, async (req: Request, res: Response, next: NextFunction) => {
      req.query.ID = req.params.id;
      await RouterUtils.handleRestServerAction(CarService.handleGetCar.bind(this), ServerAction.CAR, req, res, next);
    });
  }

  private buildRouteUpdateCar(): void {
    this.router.put(`/${RESTServerRoute.REST_CAR}`, async (req: Request, res: Response, next: NextFunction) => {
      req.query.ID = req.params.id;
      await RouterUtils.handleRestServerAction(CarService.handleUpdateCar.bind(this), ServerAction.CAR_UPDATE, req, res, next);
    });
  }

  private buildRouteDeleteCar(): void {
    this.router.delete(`/${RESTServerRoute.REST_CAR}`, async (req: Request, res: Response, next: NextFunction) => {
      req.query.ID = req.params.id;
      await RouterUtils.handleRestServerAction(CarService.handleDeleteCar.bind(this), ServerAction.CAR_DELETE, req, res, next);
    });
  }
}
