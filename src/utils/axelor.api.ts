import config from "../config";
import axios from "axios"
import { IProduct } from "../model/product.model";

const API = axios.create({
  baseURL: `${config.axelor.url}/ws/rest`,
});


export const login = () => axios.post(`${config.axelor.url}/login.jsp`, {
  username: config.axelor.username,
  password: config.axelor.password
})

export const logout = (cookie: any) => axios.post(`${config.axelor.url}/logout`, {
  headers: {
    Cookie: cookie,
  }
})

export const createProduct = (data: Partial<IProduct>, cookie: any) => API.post(
  "/com.axelor.apps.base.db.Product",
  data, {
  headers: {
    Cookie: cookie,
  }
})

export const getProduct = (id: number, cookie: any) => API.get(
  `/com.axelor.apps.base.db.Product/${id}`,
  {
    headers: {
      Cookie: cookie,
    }
  })

export const deleteProduct = (id: number, cookie: any) => API.delete(
  `/com.axelor.apps.base.db.Product/${id}`,
  {
    headers: {
      Cookie: cookie,
    }
  })

export const uploadMedia = (data: any, cookie: any, headers: any) => axios.post(`${config.axelor.url}/ws/files/upload`,
  data,
  {
    headers: {
      'Content-Type': 'application/octet-stream',
      Cookie: cookie,
      ...headers
    }
  })


