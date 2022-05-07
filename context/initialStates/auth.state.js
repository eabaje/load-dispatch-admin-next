export default {
  isLoggedIn: false,
  user: JSON.parse(localStorage.getItem("user")) || {},
  error: null,
  loading: false,
};
