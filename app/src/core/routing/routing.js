const Routes = Object.freeze({
    Login: '/login ',
    Home: '/home',
    ServicesDetail: '/services/:id',
    Services: '/services',
    Projects: '/projects',
    ProjectsDetail: '/projects/:id',
    ProjectsDetailAddLog: '/projects/:id/add',
    Clients: '/clients',
    UserDashboard: '/userdashboard',
});

// replaces : values with values from object
// e.g. route('/projects/:id', { id : 9 }) -> /projects/9
export const route = (path, options = {}) => {
    Object.keys(options).forEach(key => {
        path = path.replace(`:${key}`, options[key]);
    });
    return path;
};

export {Routes} ;