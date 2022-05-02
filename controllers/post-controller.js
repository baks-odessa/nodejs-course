const Post = require('../models/post');
const createPath = require('../helpers/create-path');

const handleError = (res, error) => {
  console.log(error);
  res.render(createPath('error'), { title, error });
};

const getPost = (req, res) => {
  const title = 'Post';

  Post
    .findById(req.params.id)
    .then((post) => res.render(createPath('post'), { post, title }))
    .catch((error) => handleError(res, error));
};

const deletePost = (req, res) => {
  Post
    .findByIdAndDelete(req.params.id)
    .then((_) => res.sendStatus(200))
    .catch((error) => handleError(res, error));
};

const getEditPost = (req, res) => {
  const title = 'Edit post';

  Post
    .findById(req.params.id)
    .then((post) => res.render(createPath('edit-post'), { post, title }))
    .catch((error) => handleError(res, error));
};

const editPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;

  Post
    .findByIdAndUpdate(id, { title, author, text })
    .then((_) => res.redirect(`/posts/${id}`))
    .catch((error) => handleError(res, error));
};

const getPosts = (_, res) => {
  const title = 'Posts';

  Post
    .find()
    .sort({ createAt: -1 })
    .then((posts) => res.render(createPath('posts'), { posts, title }))
    .catch((error) => handleError(res, error));
};

const getAddPost = (_, res) => {
  const title = 'Add Post';
  res.render(createPath('add-post'), { title });
};

const addPost = (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });

  post
    .save()
    .then((_) => res.redirect('/posts'))
    .catch((error) => handleError(res, error));
};

module.exports = {
  getPost,
  deletePost,
  getEditPost,
  editPost,
  getPosts,
  getAddPost,
  addPost,
};
