import LoginPage from "@/Pages/Login";
import routeConfig from "../config/index"

import Home from "../Pages/Home";
import RegisterPage from "@/Pages/Register";
import UserProfilePage from "@/Pages/UserProfile";
import ClubPage from "@/Pages/Club";
import ChatPage from "@/Pages/Chat";
import EventPage from "@/Pages/Event";
import CreateClubPage from "@/Pages/CreateClub";
import FriendPage from "@/Pages/Friend";
import ReportPage from "@/Pages/Report";

// Public routes
const publicRoutes = [
    { path: routeConfig.routes.home, component: Home },
    { path: routeConfig.routes.login, component: LoginPage, layout: "authLayout" },
    { path: routeConfig.routes.register, component: RegisterPage, layout: "authLayout" },
    { path: routeConfig.routes.userProfile, component: UserProfilePage },
    { path: routeConfig.routes.club, component: ClubPage, layout: "clubLayout" },
    { path: routeConfig.routes.chat, component: ChatPage, layout: "clubLayout" },
    { path: routeConfig.routes.event, component: EventPage, layout: "clubLayout" },
    { path: routeConfig.routes.createClub, component: CreateClubPage },
    { path: routeConfig.routes.friend, component: FriendPage },
    { path: routeConfig.routes.report, component: ReportPage },

];

const privateRoutes = [];

export { publicRoutes, privateRoutes };