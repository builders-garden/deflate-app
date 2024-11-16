import ky from "ky";
import { KycLinkResponse } from "./kyc";

export interface BankAccount {
  id: string;
  currency?: "usd" | "eur";
  bankName?: string;
  accountOwnerName: string;
  accountNumber?: string;
  routingNumber?: string;
  accountType: BankAccountType;
  iban?: {
    last_4?: string;
    accountNumber: string;
    bic: string;
    country: string;
  };
  account?: {
    accountNumber: string;
    routingNumber: string;
    checkingOrSavings?: string;
  };
  accountOwnerType: "individual";
  firstName?: string;
  lastName?: string;
  businessName?: string;
  address?: {
    streetLine1: string;
    streetLine2?: string;
    city: string;
    country: string;
    state?: string;
    postalCode?: string;
  };
}

export enum BankAccountType {
  IBAN = "iban",
  US = "us",
}

/**
 * @dev get a bank account by id
 * @returns {Promise<BankAccount>} the bank account from server
 */
export const getBankAccount = async ({
  token,
}: {
  token: string;
}): Promise<BankAccount> =>
  ky
    .get(`${process.env.EXPO_PUBLIC_BASE_API}/v1/bank-accounts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<BankAccount>();

/**
 * @dev create a bank account
 * @returns {Promise<BankAccount>} the bank account from server
 */
export const createBankAccount = async ({
  data: { accountNumber, routingNumber },
  token,
}: {
  token: string;
  data: {
    accountNumber: string;
    routingNumber: string;
  };
}): Promise<BankAccount> =>
  ky
    .post(`${process.env.EXPO_PUBLIC_BASE_API}/v1/bank-accounts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      json: {
        accountNumber,
        routingNumber,
      },
    })
    .json<BankAccount>();

/**
 * @dev delete a bank account
 * @returns {Promise<{message: string}>} acknowledgement from server
 */
export const deleteBankAccount = async ({
  token,
}: {
  token: string;
}): Promise<{ message: string }> =>
  ky
    .delete(`${process.env.EXPO_PUBLIC_BASE_API}/v1/bank-accounts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .json<{ message: string }>();
