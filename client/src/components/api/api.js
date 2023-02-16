import axios from 'axios'

const HOSTPhotos = ""

export const getPhotos = async () => {
  let list = await axios.get(HOSTPhotos)

  return list
}