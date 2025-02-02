/* eslint-disable @typescript-eslint/no-misused-promises */
import { RESTServerRoute, ServerAction } from '../../../../../types/Server';
import express, { NextFunction, Request, Response } from 'express';

import RouterUtils from '../../../../../utils/RouterUtils';
import TagService from '../../service/TagService';

export default class TagRouter {
  private router: express.Router;

  public constructor() {
    this.router = express.Router();
  }

  public buildRoutes(): express.Router {
    this.buildRouteTags();
    this.buildRouteTag();
    this.buildRouteCreateTag();
    this.buildRouteDeleteTag();
    this.buildRouteDeleteTags();
    this.buildRouteUpdateTag();
    this.buildRouteImportTag();
    this.buildRouteExportTag();
    this.buildRouteAssignTag();
    this.buildRouteUnassignTag();
    this.buildRouteUnassignTags();
    return this.router;
  }

  private buildRouteTags(): void {
    this.router.get(`/${RESTServerRoute.REST_TAGS}`, async (req: Request, res: Response, next: NextFunction) => {
      if (req.query.VisualID) {
        await RouterUtils.handleRestServerAction(TagService.handleGetTagByVisualID.bind(this), ServerAction.TAG_BY_VISUAL_ID, req, res, next);
      } else {
        await RouterUtils.handleRestServerAction(TagService.handleGetTags.bind(this), ServerAction.TAGS, req, res, next);
      }
    });
  }

  private buildRouteTag(): void {
    this.router.get(`/${RESTServerRoute.REST_TAG}`, async (req: Request, res: Response, next: NextFunction) => {
      req.query.ID = req.params.id;
      await RouterUtils.handleRestServerAction(TagService.handleGetTag.bind(this), ServerAction.TAG, req, res, next);
    });
  }

  private buildRouteCreateTag(): void {
    this.router.post(`/${RESTServerRoute.REST_TAGS}`, async (req: Request, res: Response, next: NextFunction) => {
      req.query.ID = req.params.id;
      await RouterUtils.handleRestServerAction(TagService.handleCreateTag.bind(this), ServerAction.TAG_CREATE, req, res, next);
    });
  }

  private buildRouteDeleteTag(): void {
    this.router.delete(`/${RESTServerRoute.REST_TAG}`, async (req: Request, res: Response, next: NextFunction) => {
      req.query.ID = req.params.id;
      await RouterUtils.handleRestServerAction(TagService.handleDeleteTag.bind(this), ServerAction.TAG_DELETE, req, res, next);
    });
  }

  private buildRouteDeleteTags(): void {
    this.router.delete(`/${RESTServerRoute.REST_TAGS}`, async (req: Request, res: Response, next: NextFunction) => {
      await RouterUtils.handleRestServerAction(TagService.handleDeleteTags.bind(this), ServerAction.TAGS_DELETE, req, res, next);
    });
  }

  private buildRouteUpdateTag(): void {
    this.router.put(`/${RESTServerRoute.REST_TAG}`, async (req: Request, res: Response, next: NextFunction) => {
      if (req.body.id) {
        await RouterUtils.handleRestServerAction(TagService.handleUpdateTag.bind(this), ServerAction.TAG_UPDATE, req, res, next);
      } else {
        await RouterUtils.handleRestServerAction(TagService.handleUpdateTagByVisualID.bind(this), ServerAction.TAG_UPDATE, req, res, next);
      }
    });
  }

  private buildRouteImportTag(): void {
    this.router.post(`/${RESTServerRoute.REST_TAGS_IMPORT}`, async (req: Request, res: Response, next: NextFunction) => {
      await RouterUtils.handleRestServerAction(TagService.handleImportTags.bind(this), ServerAction.TAGS_IMPORT, req, res, next);
    });
  }

  private buildRouteExportTag(): void {
    this.router.get(`/${RESTServerRoute.REST_TAGS_EXPORT}`, async (req: Request, res: Response, next: NextFunction) => {
      await RouterUtils.handleRestServerAction(TagService.handleExportTags.bind(this), ServerAction.TAGS_EXPORT, req, res, next);
    });
  }

  private buildRouteAssignTag(): void {
    this.router.put(`/${RESTServerRoute.REST_TAG_ASSIGN}`, async (req: Request, res: Response, next: NextFunction) => {
      req.body.visualID = req.params.id;
      await RouterUtils.handleRestServerAction(TagService.handleAssignTag.bind(this), ServerAction.TAG_ASSIGN, req, res, next);
    });
  }

  private buildRouteUnassignTag(): void {
    this.router.put(`/${RESTServerRoute.REST_TAG_UNASSIGN}`, async (req: Request, res: Response, next: NextFunction) => {
      req.body.visualID = req.params.id;
      await RouterUtils.handleRestServerAction(TagService.handleUnassignTag.bind(this), ServerAction.TAG_UNASSIGN, req, res, next);
    });
  }

  private buildRouteUnassignTags(): void {
    this.router.put(`/${RESTServerRoute.REST_TAGS_UNASSIGN}`, async (req: Request, res: Response, next: NextFunction) => {
      await RouterUtils.handleRestServerAction(TagService.handleUnassignTags.bind(this), ServerAction.TAGS_UNASSIGN, req, res, next);
    });
  }
}
