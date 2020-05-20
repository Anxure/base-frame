export default {
  SET_USERINFO: (state, info) => {
    state.userInfo = info;
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
  },
  TOGGLE_SIDERBAR: (state) => {
    state.open = !state.open;
  },
  SET_ROLE: (state, role) => {
    state.role = role
  }
}
