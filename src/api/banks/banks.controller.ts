import { Request, Response } from "express";
import { accounts } from "../../data/accounts";
import Account from "../../models/Accounts";
import { exit } from "process";

export const getAccounts = async (req: Request, res: Response) => {
  try {
    const allAccounts = await Account.find().select("-createdAt -updatedAt");
    res.status(200).json(allAccounts);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getAccountByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;
  const { currency } = req.query;
  try {
    const existingAccount = await Account.findOne({ username });
    // let user = accounts.find((account) => {
    //   if (account.username === username) {
    //     return true;
    //   }
    //   return false;
    // });
    if (existingAccount) {
      if (currency === "usd") {
        await existingAccount.updateOne({
          funds: existingAccount.funds / 3.25,
        });
        // accounts.map((account) => {
        //   if (account.username == username) {
        //     account.funds = account.funds / 3.25;
        //   }
        //   return account;
        // });
      }
      return res.status(204).end();
    } else {
      return res
        .status(404)
        .json({ message: "getAccountByUsername: Account not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getVipAccounts = async (req: Request, res: Response) => {
  const { amount } = req.query;

  if (!amount || isNaN(Number(amount))) {
    return res.status(400).json({
      message: "Amount query param is required and must be a number.",
    });
  }

  try {
    const vipAccounts = await Account.find({
      funds: { $gte: Number(amount) },
    }).select("-createdAt -updatedAt");
    console.log(vipAccounts);
    if (vipAccounts.length == 0) {
      return res.status(404).json({ message: "No vip accounts found" });
    }
    return res.status(200).json(vipAccounts);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const createAccount = async (req: Request, res: Response) => {
  try {
    // const id = Date.now();
    const { username } = req.body;
    // const funds = 0;
    const existingAccount = await Account.findOne({ username });
    // let user = accounts.find((account) => {
    //   if (account.username === username) {
    //     return true;
    //   }
    //   return false;
    // });
    if (existingAccount) {
      return res.status(409).json({ message: "Account already exists" });
    } else {
      // accounts.push({ id, username, funds });
      const newAccount = await Account.create({ username });
      res.status(201).json(newAccount);
    }
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateAccount = async (req: Request, res: Response) => {
  const { accountId } = req.params;
  // const { username = null, funds } = req.body;
  try {
    // // const existingAccount = await Account.findById(accountId);
    const existingAccount = await Account.findByIdAndUpdate(
      accountId,
      req.body
    );

    // let user = accounts.find((account) => {
    //   if (account.id === Number(accountId)) {
    //     return true;
    //   }
    //   return false;
    // });
    if (existingAccount) {
      // accounts.map((account) => {
      //   if (account.id === Number(accountId)) {
      //     account.username = username;
      //     account.funds = Number(funds);
      //   }
      //   return account;
      // });
      // // await existingAccount.updateOne(req.body);
      return res.status(204).end();
    } else {
      return res
        .status(404)
        .json({ message: "updateAccount: Account not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const existingAccount = await Account.findById(id);

    // const index = accounts.findIndex((account) => {
    //   if (account.id === Number(id)) {
    //     return true;
    //   }
    //   return false;
    // });
    if (!existingAccount) {
      return res
        .status(404)
        .json({ message: "deleteAccount: Account not found" });
    } else {
      // accounts.splice(index, 1);
      // res.status(200).json(accounts);

      // const updatedAccounts = accounts.filter((account) => {
      //   if (account.id !== Number(id)) {
      //     return true;
      //   }
      //   return false;
      // });
      await existingAccount.deleteOne();
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
