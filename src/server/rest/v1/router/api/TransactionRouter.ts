import { RESTServerRoute, ServerAction } from '../../../../../types/Server';
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { NextFunction, Request, Response } from 'express';

import RouterUtils from '../../../../../utils/RouterUtils';
import TransactionService from '../../service/TransactionService';

export default class TransactionRouter {
  private router: express.Router;

  public constructor() {
    this.router = express.Router();
  }

  public buildRoutes(): express.Router {
    this.buildRouteTransactions();
    this.buildRouteTransactionsCompleted();
    this.buildRouteTransactionsActive();
    this.buildRouteTransactionsInError();
    this.buildRouteTransactionsGetRefund();
    this.buildRouteTransaction();
    this.buildRouteTransactionConsumption();
    this.buildRouteDeleteTransaction();
    this.buildRouteDeleteTransactions();
    this.buildRoutePushTransactionCDR();
    this.buildRouteExportTransactionCDR();
    this.buildRouteTransactionStart();
    this.buildRouteTransactionStop();
    this.buildRouteTransactionSoftStop();
    this.buildRouteTransactionsRefund();
    this.buildRouteTransactionsExport();
    this.buildRouteSynchronizeRefundedTransactions();
    this.buildRouteTransactionsRefundReports();
    this.buildRouteTransactionsToRefundExport();
    return this.router;
  }

  private buildRouteTransactions(): void {
    this.router.get(`/${RESTServerRoute.REST_TRANSACTIONS}`, async (req: Request, res: Response, next: NextFunction) => {
      await RouterUtils.handleRestServerAction(TransactionService.handleGetTransactions.bind(this), ServerAction.TRANSACTIONS, req, res, next);
    });
  }

  private buildRouteTransactionsInError(): void {
    this.router.get(`/${RESTServerRoute.REST_TRANSACTIONS_IN_ERROR}`, async (req: Request, res: Response, next: NextFunction) => {
      await RouterUtils.handleRestServerAction(TransactionService.handleGetTransactionsInError.bind(this), ServerAction.TRANSACTIONS_IN_ERROR, req, res, next);
    });
  }

  private buildRouteTransactionsCompleted(): void {
    this.router.get(`/${RESTServerRoute.REST_TRANSACTIONS_COMPLETED}`, async (req: Request, res: Response, next: NextFunction) => {
      await RouterUtils.handleRestServerAction(TransactionService.handleGetTransactionsCompleted.bind(this), ServerAction.TRANSACTIONS_COMPLETED, req, res, next);
    });
  }

  private buildRouteTransactionsActive(): void {
    this.router.get(`/${RESTServerRoute.REST_TRANSACTIONS_ACTIVE}`, async (req: Request, res: Response, next: NextFunction) => {
      await RouterUtils.handleRestServerAction(TransactionService.handleGetTransactionsActive.bind(this), ServerAction.TRANSACTIONS_ACTIVE, req, res, next);
    });
  }

  private buildRouteTransactionsGetRefund(): void {
    this.router.get(`/${RESTServerRoute.REST_TRANSACTIONS_REFUND}`, async (req: Request, res: Response, next: NextFunction) => {
      await RouterUtils.handleRestServerAction(TransactionService.handleGetTransactionsToRefund.bind(this), ServerAction.TRANSACTIONS_TO_REFUND, req, res, next);
    });
  }

  private buildRouteTransaction(): void {
    this.router.get(`/${RESTServerRoute.REST_TRANSACTION}`, async (req: Request, res: Response, next: NextFunction) => {
      req.query.ID = req.params.id;
      await RouterUtils.handleRestServerAction(TransactionService.handleGetTransaction.bind(this), ServerAction.TRANSACTION, req, res, next);
    });
  }

  private buildRouteDeleteTransactions(): void {
    this.router.delete(`/${RESTServerRoute.REST_TRANSACTIONS}`, async (req: Request, res: Response, next: NextFunction) => {
      await RouterUtils.handleRestServerAction(TransactionService.handleDeleteTransactions.bind(this), ServerAction.TRANSACTIONS_DELETE, req, res, next);
    });
  }

  private buildRouteDeleteTransaction(): void {
    this.router.delete(`/${RESTServerRoute.REST_TRANSACTION}`, async (req: Request, res: Response, next: NextFunction) => {
      req.query.ID = req.params.id;
      await RouterUtils.handleRestServerAction(TransactionService.handleDeleteTransaction.bind(this), ServerAction.TRANSACTION_DELETE, req, res, next);
    });
  }

  private buildRoutePushTransactionCDR(): void {
    this.router.post(`/${RESTServerRoute.REST_TRANSACTION_CDR}`, async (req: Request, res: Response, next: NextFunction) => {
      req.body.transactionId = req.params.id;
      await RouterUtils.handleRestServerAction(TransactionService.handlePushTransactionCdr.bind(this), ServerAction.OCPI_CPO_PUSH_CDRS, req, res, next);
    });
  }

  private buildRouteExportTransactionCDR(): void {
    this.router.get(`/${RESTServerRoute.REST_TRANSACTION_CDR_EXPORT}`, async (req: Request, res: Response, next: NextFunction) => {
      req.query.ID = req.params.id;
      await RouterUtils.handleRestServerAction(TransactionService.handleExportTransactionOcpiCdr.bind(this), ServerAction.TRANSACTION_OCPI_CDR_EXPORT, req, res, next);
    });
  }

  private buildRouteTransactionConsumption(): void {
    this.router.get(`/${RESTServerRoute.REST_TRANSACTION_CONSUMPTIONS}`, async (req: Request, res: Response, next: NextFunction) => {
      req.query.TransactionId = req.params.id;
      await RouterUtils.handleRestServerAction(TransactionService.handleGetTransactionConsumption.bind(this), ServerAction.TRANSACTION_CONSUMPTION, req, res, next);
    });
  }

  private buildRouteTransactionSoftStop(): void {
    this.router.put(`/${RESTServerRoute.REST_TRANSACTION_SOFT_STOP}`, async (req: Request, res: Response, next: NextFunction) => {
      req.body.ID = req.params.id;
      await RouterUtils.handleRestServerAction(TransactionService.handleTransactionSoftStop.bind(this), ServerAction.TRANSACTION_SOFT_STOP, req, res, next);
    });
  }

  private buildRouteTransactionStop(): void {
    this.router.put(`/${RESTServerRoute.REST_TRANSACTION_STOP}`, async (req: Request, res: Response, next: NextFunction) => {
      req.body.ID = req.params.id;
      await RouterUtils.handleRestServerAction(TransactionService.handleTransactionStop.bind(this), ServerAction.TRANSACTION_STOP, req, res, next);
    });
  }

  private buildRouteTransactionStart(): void {
    this.router.put(`/${RESTServerRoute.REST_TRANSACTION_START}`, async (req: Request, res: Response, next: NextFunction) => {
      await RouterUtils.handleRestServerAction(TransactionService.handleTransactionStart.bind(this), ServerAction.TRANSACTION_START, req, res, next);
    });
  }

  private buildRouteTransactionsRefund(): void {
    this.router.post(`/${RESTServerRoute.REST_TRANSACTIONS_REFUND_ACTION}`, async (req: Request, res: Response, next: NextFunction) => {
      req.body.transactionsIDs = req.body.transactionIds;
      await RouterUtils.handleRestServerAction(TransactionService.handleRefundTransactions.bind(this), ServerAction.TRANSACTIONS_REFUND, req, res, next);
    });
  }

  private buildRouteTransactionsExport(): void {
    this.router.get(`/${RESTServerRoute.REST_TRANSACTIONS_EXPORT}`, async (req: Request, res: Response, next: NextFunction) => {
      await RouterUtils.handleRestServerAction(TransactionService.handleExportTransactions.bind(this), ServerAction.TRANSACTIONS_EXPORT, req, res, next);
    });
  }

  private buildRouteSynchronizeRefundedTransactions(): void {
    this.router.post(`/${RESTServerRoute.REST_TRANSACTIONS_SYNCHRONIZE_REFUNDED}`, async (req: Request, res: Response, next: NextFunction) => {
      await RouterUtils.handleRestServerAction(TransactionService.handleSynchronizeRefundedTransactions.bind(this), ServerAction.SYNCHRONIZE_REFUNDED_TRANSACTIONS, req, res, next);
    });
  }

  private buildRouteTransactionsRefundReports(): void {
    this.router.get(`/${RESTServerRoute.REST_TRANSACTIONS_REFUND_REPORTS}`, async (req: Request, res: Response, next: NextFunction) => {
      await RouterUtils.handleRestServerAction(TransactionService.handleGetRefundReports.bind(this), ServerAction.TRANSACTIONS_TO_REFUND_REPORTS, req, res, next);
    });
  }

  private buildRouteTransactionsToRefundExport(): void {
    this.router.get(`/${RESTServerRoute.REST_TRANSACTIONS_REFUND_EXPORT}`, async (req: Request, res: Response, next: NextFunction) => {
      await RouterUtils.handleRestServerAction(TransactionService.handleExportTransactionsToRefund.bind(this), ServerAction.TRANSACTIONS_TO_REFUND_EXPORT, req, res, next);
    });
  }
}
