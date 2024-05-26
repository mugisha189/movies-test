import express, { Router } from "express";
import userRouter from "./user.route";
import movieRouter from "./movie.route";
import authRouter from "./auth.route";
import docsRouter from "./docs.route";

const router = express.Router();

const routes: {
  path: string;
  route: Router;
}[] = [
  { path: "/users", route: userRouter },
  { path: "/movie", route: movieRouter },
  { path: "/auth", route: authRouter },
];

const devRoutes = [
  {
    path: "/docs",
    route: docsRouter,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

devRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
