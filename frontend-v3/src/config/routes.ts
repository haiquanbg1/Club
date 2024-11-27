const routes = {
    home: '/',
    login: 'login',
    register: 'register',
    userProfile: '/me',
    club: '/club/:id',
    conversation: '/club/:id/conversation/:id',
    chat: 'friend/:id/chat',
    clubProfile: '/clubProfile/:userId',
    event: "/event/:id",
    createClub: "/createClub",
    friend: "/friend",
    report: "/report/:id",
    notification: "/club/:id/notification",
    clubInfo: "/club/changeProfile/:id",
    listEvent: "/club/listEvent/:eventId",
    detailsEvent: "/club/:clubId/:eventId"
};

export default routes;
