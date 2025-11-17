import { Request, Response } from "express";
import { accounts } from "../../data/accounts";

export const getAccounts = (req: Request, res: Response) => {
  res.status(200).json(accounts);
};

export const getAccountByUsername = (req: Request, res: Response) => {
  const { username } = req.params;
  const { currency } = req.query;
  let user = accounts.find((account) => {
    if (account.username === username) {
      return true;
    }
    return false;
  });
  if (user) {
    if (currency === "usd") {
      accounts.map((account) => {
        if (account.username == username) {
          account.funds = account.funds / 3.25;
        }
        return account;
      });
    }
    return res.status(200).json(accounts);
  } else {
    return res.status(404).json({ message: "Account not found" });
  }
};

export const createAccount = (req: Request, res: Response) => {
  const id = Date.now();
  const username = req.body.username;
  const funds = 0;
  let user = accounts.find((account) => {
    if (account.username === username) {
      return true;
    }
    return false;
  });
  if (user) {
    return res.status(409).json({ message: "Account already exists" });
  } else {
    accounts.push({ id, username, funds });
    res.status(201).json(accounts);
  }
};

export const deleteAccount = (req: Request, res: Response) => {
  const { id } = req.params;
  const index = accounts.findIndex((account) => {
    if (account.id === Number(id)) {
      return true;
    }
    return false;
  });
  if (index === -1) {
    return res.status(404).json({ message: "Account not found" });
  } else {
    accounts.splice(index, 1);
    res.status(200).json(accounts);
  }
};

export const updateAccount = (req: Request, res: Response) => {
  const { accountId } = req.params;
  const { username = null, funds } = req.body;

  let user = accounts.find((account) => {
    if (account.id === Number(accountId)) {
      return true;
    }
    return false;
  });
  if (user) {
    accounts.map((account) => {
      if (account.id === Number(accountId)) {
        account.username = username;
        account.funds = Number(funds);
      }
      return account;
    });

    return res.status(200).json(accounts);
  } else {
    return res.status(404).json({ message: "Account not found" });
  }
};
