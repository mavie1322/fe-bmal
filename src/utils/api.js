import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://bmal237.herokuapp.com/api",
});

export const getUsers = () => {
  return newsApi.get("/users").then((res) => {
    return res.data.users;
  });
};

export const getUserByUsername = (username) => {
  return newsApi.get(`/users/${username}`).then((res) => {
    return res.data.user;
  });
};

export const getTopics = () => {
  return newsApi.get("/topics").then((res) => {
    return res.data.topics;
  });
};

export const getArticles = (props, sortBy, order) => {
  let endpoint = "/articles";
  if (props.topic && !sortBy && !order) {
    endpoint += `?topic=${props.topic}`;
  } else if (!props.topic && sortBy && !order) {
    endpoint += `?sort_by=${sortBy}`;
  } else if (!props.topic && !sortBy && order) {
    endpoint += `?order=${order}`;
  } else if (props.topic && sortBy && !order) {
    endpoint += `?topic=${props.topic}&sort_by=${sortBy}`;
  } else if (props.topic && !sortBy && order) {
    endpoint += `?topic=${props.topic}&order=${order}`;
  } else if (!props.topic && sortBy && order) {
    endpoint += `?sort_by=${sortBy}&order=${order}`;
  } else {
    endpoint += `?topic=${props.topic}&sort_by=${sortBy}&order=${order}`;
  }
  return newsApi.get(endpoint).then((res) => {
    return res.data.articles;
  });
};

export const getArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`).then((res) => {
    return res.data.article;
  });
};

export const getCommentsByArticleId = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`).then((res) => {
    return res.data.comments;
  });
};
