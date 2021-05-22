import axios from "axios";

const API_VERSION = "/api";
// const BASE_URL_QUERY = "https://e-punla-query.azurewebsites.net";
// const BASE_URL_COMMAND = "https://e-punla-command.azurewebsites.net";

const BASE_URL_QUERY = "http://localhost:5001";
const BASE_URL_COMMAND = "http://localhost:5002";

const test_token =
  "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxIiwibmJmIjoxNjIxNjg1MzIwLCJleHAiOjE2MjIyOTAxMjAsImlhdCI6MTYyMTY4NTMyMH0.n8sAkVE_cYEgepNH-7klfUb4oZ2JHfQ_XGikr-l28DOFw0Q7BDXBXZy_eDJ2rxwa-qcZZO871LPU9W_EPZeRYQ";

const getQueryUrl = (url) => {
  return `${BASE_URL_QUERY}${API_VERSION}${url}`;
};

const getCommandUrl = (url) => {
  return `${BASE_URL_COMMAND}${API_VERSION}${url}`;
};

const getAxiosClient = async (
  token,
  forQuery,
  method,
  url,
  options,
  data,
  params
) => {
  if (!token) {
    token = test_token;
  }

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

const clientApiRequest = (token, forQuery) => {
  return {
    get: (url, options = {}, params = {}) =>
      getAxiosClient(token, forQuery, "get", url, options, null, params),
    post: (url, data, options = {}) =>
      getAxiosClient(token, forQuery, "post", url, options, data),
    put: (url, data, options = {}) =>
      getAxiosClient(token, forQuery, "put", url, options, data),
    delete: (url, data, options = {}) =>
      getAxiosClient(token, forQuery, "delete", url, options, data),
  };
};

export const clientCommandApiRequest = (token = null) => {
  return clientApiRequest(token, false);
};

export const clientQueryApiRequest = (token = null) => {
  return clientApiRequest(token, true);
};
