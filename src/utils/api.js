import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://bmal237.herokuapp.com/api",
});

export const getUsers = () => {
  return newsApi.get("/users").then(({ data }) => {
    return data.users;
  });
};

export const getUserByUsername = (username) => {
  return newsApi.get(`/users/${username}`).then(({ data }) => {
    return data.user;
  });
};

export const getTopics = () => {
  return newsApi.get("/topics").then(({ data }) => {
    return data.topics;
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
  return newsApi.get(endpoint).then(({ data }) => {
    return data.articles;
  });
};

export const getArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const updateVoteByArticle = (article_id, votes) => {
  return newsApi.patch(`/articles/${article_id}`, votes).catch((error) => {
    return error;
  });
};

export const getCommentsByArticleId = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const updateVoteByComment = (comment_id, votes) => {
  return newsApi.patch(`/comments/${comment_id}`, votes).then(({ data }) => {
    return data.comment;
  });
};
