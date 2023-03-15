import { APP_ROUTES } from "../constants/app-routes";

export const checkIsUnauthorizedRoute = (asPath: string) => {
  const appUnauthorizedRoutes = APP_ROUTES.private.unauthorized;

  return appUnauthorizedRoutes.includes(asPath);
};
