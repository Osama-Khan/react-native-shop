import React from 'react';
import axios from 'axios';
import attachTokenInterceptor from './attach-token.interceptor';
import appState from '../state/state';

let requestInterceptors: number[] = [];
let responseInterceptors: number[] = [];

/**
 * Adds the interceptors for axios request and response
 */
export default function initializeInterceptors() {
  resetInterceptors();

  // Attach bearer token to header for every request if user is logged in
  if (appState.user?.token) {
    requestInterceptors.push(
      axios.interceptors.request.use(
        attachTokenInterceptor(appState.user.token),
      ),
    );
  }
}

/** Clears any previously set interceptors */
const resetInterceptors = () => {
  if (requestInterceptors.length > 0) {
    requestInterceptors.forEach(i => axios.interceptors.request.eject(i));
    requestInterceptors = [];
  }
  if (responseInterceptors.length > 0) {
    responseInterceptors.forEach(i => axios.interceptors.response.eject(i));
    responseInterceptors = [];
  }
};
