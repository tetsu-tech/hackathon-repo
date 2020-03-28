import axios from 'axios'

const basicAuth =
  'Basic ' +
  Buffer.from(process.env.USER_NAME + ':' + process.env.USER_PASSWORD).toString(
    'base64'
  )

export const api = axios.create({
  baseURL: '/api',
  headers: { Authorization: basicAuth }
})
