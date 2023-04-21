import axios from 'axios'

const HOSTPhotos = ""
const HOSTAuthorization = ""
const HOSTDoctors = ""
const HOSTUsers = ""
const HOSTAssign = ""
const HOSTDeleteAssign = ""

export const getPhotos = async () => {
  let list = await axios.get(HOSTPhotos)

  return list
}

export const getPhotosUser = async(telegramId) => {
  let list = await axios.get(`${HOSTPhotos}${telegramId}`)
  console.log(list)
  return list

}

export const getUsers = async () => {
  
  let list = await axios.get(HOSTUsers)
  return list

}

export const getClients = async () => {
  
  let list = await axios.get(`${HOSTUsers}client`)
  return list

}

export const getDoctors = async () => {

  let list = await axios.get(`${HOSTUsers}doctor`)
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

export const createDoctor = async (data) => {
  return await axios.post(`${HOSTDoctors}`, {...data, role: 'doctor'})
}

export const assignPatientToDoctor = async (doctorId, clientId) => {
  return await axios.post(`${HOSTAssign}${doctorId}/${clientId}`, )
}

export const deleteAssignPatientToDoctor = async (doctorId, clientId) => {
  return await axios.post(`${HOSTDeleteAssign}${doctorId}/${clientId}`, )
}
