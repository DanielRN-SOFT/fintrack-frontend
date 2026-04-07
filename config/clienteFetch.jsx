const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const clienteFetch = async (endpoint, options = {}) => {
  console.log(options);
  return await fetch(`${BASE_URL}${endpoint}`, options);
};

export default clienteFetch;
