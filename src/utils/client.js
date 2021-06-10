import axios from "axios";

const API_VERSION = "/api";
// const BASE_URL_QUERY = "https://e-punla-query.azurewebsites.net";
// const BASE_URL_COMMAND = "https://e-punla-command.azurewebsites.net";

const BASE_URL_QUERY = "https://epunla-query-api.herokuapp.com";
const BASE_URL_COMMAND = "https://epunla-command-api.herokuapp.com";

// const BASE_URL_QUERY = "https://localhost:5001";
// const BASE_URL_COMMAND = "https://localhost:44227";

const getQueryUrl = (url) => {
  return `${BASE_URL_QUERY}${API_VERSION}${url}`;
};

const getCommandUrl = (url) => {
  return `${BASE_URL_COMMAND}${API_VERSION}${url}`;
};

const getAxiosClient = async (forQuery, method, url, options, data, params) => {
  let token = localStorage.getItem("token");

  const axiosSetup = {
    headers: {
      Authorization: !token ? "" : `Bearer ${token}`,
    },
    timeout: 120000,
  };

  if (!params) {
    axiosSetup.params = params;
  }

  const axiosInstance = axios.create(axiosSetup);

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Do centralize error handling here
      //store.dispatch(showErrorDialog(error));
      throw error.response.data;
    }
  );

  const requestUrl = !!forQuery ? getQueryUrl(url) : getCommandUrl(url);

  if (data) {
    return axiosInstance[method](requestUrl, data, options);
  }
  return axiosInstance[method](requestUrl, options);
};

const clientApiRequest = (forQuery) => {
  return {
    get: (url, options = {}, params = {}) =>
      getAxiosClient(forQuery, "get", url, options, null, params),
    post: (url, data, options = {}) =>
      getAxiosClient(forQuery, "post", url, options, data),
    put: (url, data, options = {}) =>
      getAxiosClient(forQuery, "put", url, options, data),
    delete: (url, data, options = {}) =>
      getAxiosClient(forQuery, "delete", url, options, data),
  };
};

export const clientCommandApiRequest = () => {
  return clientApiRequest(false);
};

export const clientQueryApiRequest = () => {
  return clientApiRequest(true);
};
