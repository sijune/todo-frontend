import { API_BASE_URL } from "../api-config";

const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };
  console.log(options.url);
  if (request) {
    options.body = JSON.stringify(request);
  }
  return (
    fetch(options.url, options)
      .then((response) =>
        response.json().then((json) => {
          if (!response.ok) {
            return Promise.reject(json);
          }
          return json;
        })
      )
      //백엔드에서 에러 반환시 리다이렉트 진행
      .catch((error) => {
        if (error.status === 403) {
          window.location.href = "/login";
        }
        return Promise.reject(error);
      })
  );
}

export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO).then((response) => {
    if (response.token) {
      localStorage.setItem(ACCESS_TOKEN, response.token);
      window.location.href = "/";
    }
  });
}

export function signout() {
  localStorage.setItem(ACCESS_TOKEN, null);
  window.location.href = "/login";
}

export function signup(userDTO) {
  return call("/auth/signup", "POST", userDTO);
}
