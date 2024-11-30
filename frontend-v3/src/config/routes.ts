const routes = {
    home: '/',
    login: 'login',
    register: 'register',
    userProfile: '/me',
    club: '/club/:clubId',
    conversation: '/club/:id/conversation/:id',
    chat: 'friend/:id/chat',
    clubProfile: '/clubProfile/:userId',
    // event: "/event/:id",
    createClub: "/createClub",
    friend: "/friend",
    report: "/report/:clubId",
    notification: "/club/:clubId/notification",
    clubInfo: "/club/changeProfile/:clubId",
    listEvent: "/club/listEvent/:clubId",
    detailsEvent: "/club/:clubId/:eventId"
};

export default routes;
