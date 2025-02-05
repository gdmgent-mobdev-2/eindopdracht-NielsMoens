const express = require('express');
const ClientController = require("../controllers/ClientController");
const ProjectController = require("../controllers/ProjectController");
const LogsController = require("../controllers/LogsController")
const ReviewController = require("../controllers/ReviewController");
const UserController = require("../controllers/UserController");
const StarredItemsController = require("../controllers/StarredItemsController")
const {Roles} = require("../models/User");
const {withRole} = require("../services/auth/auth.services");

const clientController = new ClientController();
const projectController = new ProjectController();
const logsController = new LogsController();
const reviewController = new ReviewController();
const userController = new UserController();
const starredItemsController = new StarredItemsController();

const authRouter = express.Router();
const adminRouter = express.Router();



// client routes
authRouter.get('/clients', clientController.getClients)
authRouter.get('/clients/:id', clientController.getClientById)
adminRouter.post('/clients', clientController.createClients)
adminRouter.delete('/clients/:id', clientController.deleteClientById)
adminRouter.patch('/clients/:id', clientController.updateClientById)

// Projects
authRouter.get('/projects', projectController.getProjects)
authRouter.get('/projects/:id', projectController.getProjectById)
adminRouter.post('/projects', projectController.createProject)
adminRouter.delete('/projects/:id', projectController.deleteProjectById)
adminRouter.patch('/projects/:id', projectController.updateProjectById)

// logs
authRouter.get('/projects/:projectId/logs', logsController.getLogsByProject);
authRouter.post('/projects/:projectId/logs', logsController.createLogByProject);

// review routes
authRouter.get('/reviews', reviewController.getReviews)
authRouter.post('/reviews', reviewController.createReviews)
adminRouter.delete('/reviews/:id', reviewController.deleteReviewsById)

// users
authRouter.get('/users', userController.getUsers);
authRouter.get('/users/:id', userController.getUserById);
authRouter.patch('/users/:id', userController.updateUserById);
adminRouter.delete('/users/:id', userController.deleteUserById);
adminRouter.post('/users', userController.register);

// starred Items
authRouter.get('/starredItems', starredItemsController.getStarredItems);
authRouter.post('/starredItems', starredItemsController.createStarredItems);
authRouter.delete('/starredItems/:id', starredItemsController.deleteStarredItems);

authRouter.use(withRole(Roles.admin), adminRouter);

module.exports = authRouter;