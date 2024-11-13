const routes = {
    home: '/',
    login: '/login',
    register: 'register',
    userProfile: '/me',
    club: '/club/:id',
    conversation: '/club/:id/conversation/:id',
    chat: '/chat',
    clubProfile: '/clubProfile/:id',
    event: "/event/:id",
    createClub: "/createClub",
    friend: "/friend",
    report: "/report/:id",
    notification: "/club/:id/notification",
    clubInfo: "/club/changeProfile/:id"
};

export default routes;
