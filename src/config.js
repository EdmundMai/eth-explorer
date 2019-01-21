export const DONATION_AMOUNTS = [10, 20, 50, 100, 500];

export const PAYMENT_STATUSES = {
  NONE: "NONE",
  PENDING: "PENDING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR"
};

export const IS_TEST_ENV = process.env.NODE_ENV === "test";
