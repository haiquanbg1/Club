import LoginPage from "@/Pages/Login";
import routeConfig from "../config/index"

import Home from "../Pages/Home";
import RegisterPage from "@/Pages/Register";
import UserProfilePage from "@/Pages/UserProfile";
import ClubPage from "@/Pages/Club";
import ChatPage from "@/Pages/Chat";

import CreateClubPage from "@/Pages/CreateClub";
import FriendPage from "@/Pages/Friend";
import ReportPage from "@/Pages/Report";
import NotificationPage from "@/Pages/NotiPage";
import ClubInfoPage from "@/Pages/ClubInfo";
import ChatClubPage from "@/Pages/ChatClub";
// import { Component } from "react";
import ListEventPage from "@/Pages/ListEvent";
import EventDetailsPage from "@/Pages/EventDetails";
import ReportListPage from "@/Pages/ReportList";

// Public routes
const publicRoutes = [
    { path: routeConfig.routes.home, component: Home },
    { path: routeConfig.routes.login, component: LoginPage, layout: "authLayout" },
    { path: routeConfig.routes.register, component: RegisterPage, layout: "authLayout" },
    { path: routeConfig.routes.userProfile, component: UserProfilePage, layout: "no" },
    { path: routeConfig.routes.club, component: ClubPage, layout: "clubLayout" },
    { path: routeConfig.routes.chat, component: ChatPage, layout: "chatLayout" },
    // { path: routeConfig.routes.event, component: EventPage, layout: "clubLayout" },
    { path: routeConfig.routes.notification, component: NotificationPage, layout: "clubLayout" },
    { path: routeConfig.routes.clubInfo, component: ClubInfoPage, layout: "clubLayout" },
    { path: routeConfig.routes.createClub, component: CreateClubPage, layout: "no" },
    { path: routeConfig.routes.friend, component: FriendPage },
    { path: routeConfig.routes.report, component: ReportPage, layout: "no" },
    { path: routeConfig.routes.conversation, component: ChatClubPage, layout: "clubLayout" },
    { path: routeConfig.routes.listEvent, component: ListEventPage, layout: "clubLayout" },
    { path: routeConfig.routes.detailsEvent, component: EventDetailsPage, layout: "clubLayout" },
    { path: routeConfig.routes.reportList, component: ReportListPage, layout: "clubLayout" }
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };