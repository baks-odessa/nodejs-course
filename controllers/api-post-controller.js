const Post = require('../models/post');

const handleError = (res, error) => {
  res.status(500).send(error.message);
};

const getPost = (req, res) => {
  const title = 'Post';

  Post
    .findById(req.params.id)
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};

const deletePost = (req, res) => {
  const { id } = req.params;
  Post
    .findByIdAndDelete(id)
    .then((_) => res.status(200).json(id))
    .catch((error) => handleError(res, error));
};

const editPost = (req, res) => {
  const { title, author, text } = req.body;
  const { id } = req.params;

  Post
    .findByIdAndUpdate(id, { title, author, text }, { new: true })
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};

const getPosts = (_, res) => {
  const title = 'Posts';

  Post
    .find()
    .sort({ createAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => handleError(res, error));
};

const addPost = (req, res) => {
  const { title, author, text } = req.body;
  const post = new Post({ title, author, text });

  post
    .save()
    .then((post) => res.status(200).json(post))
    .catch((error) => handleError(res, error));
};

module.exports = {
  getPost,
  deletePost,
  editPost,
  getPosts,
  addPost,
};
