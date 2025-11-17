import express, { Request, Response } from "express";
import { accounts } from "../../data/accounts";
import {
  getAccounts,
  getAccountByUsername,
  createAccount,
  deleteAccount,
  updateAccount,
} from "./banks.controller";
const bankRoutes = express();

bankRoutes.get("/accounts", getAccounts);

bankRoutes.get("/accounts/:username", getAccountByUsername);

bankRoutes.post("/accounts", createAccount);

bankRoutes.delete("/accounts/:id", deleteAccount);

bankRoutes.put("/accounts/:accountId", updateAccount);

export default bankRoutes;
