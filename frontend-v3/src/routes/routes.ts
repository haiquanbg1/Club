import LoginPage from "@/Pages/Login";
import routeConfig from "../config/index"

import Home from "../Pages/Home";
import RegisterPage from "@/Pages/Register";
import UserProfilePage from "@/Pages/UserProfile";

// Public routes
const publicRoutes = [
    { path: routeConfig.routes.home, component: Home },
    { path: routeConfig.routes.login, component: LoginPage },
    { path: routeConfig.routes.register, component: RegisterPage },
    { path: routeConfig.routes.userProfile, component: UserProfilePage }
    // { path: config.routes.getTicket, component: GetTicket1, layout: 'getTicketLayout' },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };