import LoginPage from "@/Pages/Login";
import routeConfig from "../config/index"

import Home from "../Pages/Home";
import RegisterPage from "@/Pages/Register";

// Public routes
const publicRoutes = [
    { path: routeConfig.routes.home, component: Home },
    { path: routeConfig.routes.login, component: LoginPage },
    { path: routeConfig.routes.register, component: RegisterPage },
    // { path: config.routes.getTicket, component: GetTicket1, layout: 'getTicketLayout' },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };