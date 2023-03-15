import { APP_ROUTES } from "../constants/app-routes";

export const checkIsAdminRoute = (asPath: string) => {
  const appAdminRoutes = APP_ROUTES.private.admin;

  return appAdminRoutes.includes(asPath);
};
