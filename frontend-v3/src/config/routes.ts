const routes = {
    home: '/',
    login: 'login',
    register: 'register',
    userProfile: '/me',
    club: '/club/:clubId',
    conversation: '/club/:clubId/conversation/:conversationId',
    chat: 'friend/:id/chat',
    clubProfile: '/clubProfile/:userId',
    // event: "/event/:id",
    createClub: "/createClub",
    friend: "/friend",
    report: "/report/:clubId",
    reportList: "/reportList/:clubId",
    notification: "/club/:clubId/notification",
    clubInfo: "/club/changeProfile/:clubId",
    listEvent: "/club/listEvent/:clubId",
    detailsEvent: "/club/eventDetails/:clubId/:eventId"
};

export default routes;
