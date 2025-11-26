import { Router } from "express";
import {
  getAccounts,
  getAccountByUsername,
  createAccount,
  deleteAccount,
  updateAccount,
  getVipAccounts,
} from "./banks.controller";

const bankRoutes = Router();

bankRoutes.get("/accounts", getAccounts);

bankRoutes.get("/accounts/vip", getVipAccounts);

bankRoutes.get("/accounts/:username", getAccountByUsername);

bankRoutes.post("/accounts", createAccount);

bankRoutes.delete("/accounts/:id", deleteAccount);

bankRoutes.put("/accounts/:accountId", updateAccount);

export default bankRoutes;
