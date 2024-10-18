import routeConfig from "../config/index"

import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import UserProfile from "../Pages/UserProfile";
// Public routes
const publicRoutes = [
    { path: routeConfig.routes.home, component: Home },
    { path: routeConfig.routes.login, component: Login },
    { path: routeConfig.routes.register, component: Register },
    { path: routeConfig.routes.userProfile, component: UserProfile },
    // { path: config.routes.getTicket, component: GetTicket1, layout: 'getTicketLayout' },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };