const express = require('express');
require('./helpers/dbConnection');
const bodyParser = require('body-parser');
const { errorHandler } = require('./middlewares');
const { User, Blog } = require('./models');
const { getBlogsHateos } = require('./helpers/constants');

const server = express();

server.use(bodyParser.json());

const userRouter = express.Router();
const blogsRouter = express.Router();

/////////////////////////////////////////////////////////////////////
// For the blogs router
// for POST request
blogsRouter.post('/', async (req, res, next) => {
    const {title, body} = req.body;
    try {
        const { _id: blogId } = await Blog.create(
            { user: req.user._id, title, body }
        );
        req.user.blogs.push(blogId);
        await req.user.save();
    } catch (err) {
        return next(err);
    }
    res.status(204).end();
});

// for GET request
blogsRouter.get('/', async (req, res, next) => {
    console.log(req);
    const blogsHateos = getBlogsHateos('https://', 'localhost')

    res.status(200).send(blogsHateos);
});

// For the user Router
// for the GET request
userRouter.get('/:user_id', async (req, res) => {
    res.header({
        'Content-Type': 'application/json'
    });
    const populatedUser = await req.user.populate('blogs');
    res.status(201)
        .send(populatedUser);
});

// for the POST request
userRouter.post('/', async (req, res, next) => {
    const {name, email} = req.body;

    try {
        await User.create({ name, email });
    } catch (err) {
        next(err);
    }
    res.status(204);
    res.send();
});

// to find by user_id 
userRouter.param('user_id', async (req, res, next, userId) => {
    console.log('userID: ', userId);
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error('notfound');
        req.user = user;
    } catch (err) {
        return next(err);
    }
    next();
});

userRouter.use('/:user_id/blogs', blogsRouter);
server.use('/users', userRouter);
server.use('/blogs', blogsRouter);

// for the errorHandler middleware
server.use(errorHandler);

server.listen(3000, 'localhost', () => {
    console.log(`server is listening on: 3000`);
});
