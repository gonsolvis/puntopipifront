import axios from 'axios';

class ToiletsService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/examples
  createOne = async (requestBody) => {
    return this.api.post('/toilets/new', requestBody);
  }



  uploadImage = async (file) => {
    return this.api.post("/toilets/upload", file)
  }
  
  // GET /api/examples
  getAll = async () => {
    return this.api.get('/toilets');
  }

  // GET /api/examples/:id
  getOne = async (id) => {
    return this.api.get(`/toilets/${id}`);
  }

  // PUT /api/examples/:id
  updateOne = async (id, requestBody) => {
    return this.api.put(`/toilets/edit/${id}`, requestBody);
  }

  // DELETE /api/examples/:id
  deleteToilet = async (id) => {
    return this.api.delete(`/toilets/delete/${id}`);
  } 


}

// Create one instance of the service
const toiletsService = new ToiletsService();

export default toiletsService;