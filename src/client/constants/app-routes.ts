export const APP_ROUTES = {
  private: {
    unauthorized: [
      "/dashboard",
      "/dashboard/breakdown",
      "/dashboard/customers",
      "/dashboard/daily",
      "/dashboard/monthly",
      "/dashboard/overview",
      "/dashboard/products",
      "/dashboard/transactions",
      "/dashboard/performance",
    ],
    admin: ["/dashboard/admin"],
  },
  public: {
    all: ["/"],
  },
};
