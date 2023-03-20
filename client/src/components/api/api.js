import axios from 'axios'

const HOSTPhotos = ""
const HOSTAuthorization = ""

export const getPhotos = async () => {
  let list = await axios.get(HOSTPhotos)

  return list
}

export const checkAuthorization = async (authState) => {
  return axios.post(`${HOSTAuthorization}`, authState)
    .then(response => {
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      localStorage.setItem("user", authState.username)
      setAuthToken(token);
      window.location.href = './diary'
      return
    })
}

export const logOut = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user")
  window.location.href = 'auth'
}

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else delete axios.defaults.headers.common["Authorization"];
}