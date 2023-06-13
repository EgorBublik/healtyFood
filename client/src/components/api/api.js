import axios from 'axios'

// const HOSTPhotos = "http://localhost:4001/photos/"
// const HOSTAuthorization = "http://localhost:4001/auth/login/"
// const HOSTDoctors = "http://localhost:4001/users/signup"
// const HOSTUsers = "http://localhost:4001/users/"
// const HOSTAssign = "http://localhost:4001/users/assign-patient/"
// const HOSTDeleteAssign = "http://localhost:4001/users/delete-assign-pacient/"

const HOSTPhotos = process.env.REACT_APP_PHOTOS
const HOSTAuthorization = process.env.REACT_APP_AUTHORIZATION
const HOSTDoctors = process.env.REACT_APP_DOCTORS
const HOSTUsers = process.env.REACT_APP_USERS
const HOSTAssign = process.env.REACT_APP_ASSIGN
const HOSTDeleteAssign = process.env.REACT_APP_DELETE_ASSIGN

console.log('test1 ',process.env.REACT_APP_TEST1)

export const getPhotos = async () => {
  let list = await axios.get(HOSTPhotos)

  return list
}

export const getPhotosUser = async(telegramId) => {
  let list = await axios.get(`${HOSTPhotos}${telegramId}`)
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
      const role = response.data.role;
      return {token, role}
    }
  )

}

export const logOut = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user")
  window.location.href = 'auth'
}

export const createDoctor = async (data) => {
  return await axios.post(`${HOSTDoctors}`, {...data, role: 'doctor'})
}

export const assignPatientToDoctor = async (doctorId, clientId) => {
  return await axios.post(`${HOSTAssign}${doctorId}/${clientId}/`, )
}

export const deleteAssignPatientToDoctor = async (doctorId, clientId) => {
  return await axios.post(`${HOSTDeleteAssign}${doctorId}/${clientId}/`, )
}
