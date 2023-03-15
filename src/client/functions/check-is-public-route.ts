import { APP_ROUTES } from "../constants/app-routes";

export const checkIsPublicRoute = (asPath: string) => {
  const appPublicRoutes = APP_ROUTES.public.all;

  return appPublicRoutes.includes(asPath);
};
