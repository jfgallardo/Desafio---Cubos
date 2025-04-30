import { CONFIG } from "@/config-global";
import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { getErrorMessage } from "./helper";

interface CustomSession extends Session {
  access_token?: string;
}

const axiosInstance = axios.create({ baseURL: CONFIG.site.serverUrl });

const EXCLUDED_ROUTES = new Set(["/auth/login", "/user/create"]);

const isBrowser = typeof window !== "undefined";

let cachedSession: CustomSession | null = null;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(getErrorMessage(error));
  },
);

axiosInstance.interceptors.request.use(async (config) => {
  if (!isBrowser) return config;

  if (!cachedSession) {
    cachedSession = (await getSession()) as CustomSession;
  }

  const isExcluded = config.url && EXCLUDED_ROUTES.has(config.url);

  if (!isExcluded && cachedSession?.access_token) {
    config.headers.Authorization = `Bearer ${cachedSession.access_token}`;
  }

  return config;
});

export default axiosInstance;

export const endpoints = {
  auth: {
    signIn: "/auth/login",
    signUp: "/user/create",
    forgotPassword: "/auth/forgot-password",
  },
  movies: {
    create: "/movies",
    delete: (id: string) => `/movies/delete/${id}`,
    list: "/movies",
    getByOwner: (owner: string) => `/movies/owner/${owner}`,
    download: (id: string) => `/movies/download/${id}`,
  },
  users: {
    getUsersByQuery: "/user",
  },
};
