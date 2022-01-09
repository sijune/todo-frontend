import { API_BASE_URL } from "../api-config";

export function call(api, method, request) {
  let options = {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    url: API_BASE_URL + api,
    method: method,
  };
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
