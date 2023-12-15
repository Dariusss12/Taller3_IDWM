import axios from 'axios';


const github = axios.create({
  baseURL: `https://api.github.com/`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default github;