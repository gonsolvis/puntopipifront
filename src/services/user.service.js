import axios from 'axios';

class UserService {
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
//   createOne = async (requestBody) => {
//     return this.api.post('/examples', requestBody);
//   }

  // GET /api/examples
//   getAll = async () => {
//     return this.api.get('/api/examples');
//   }

  // GET /api/examples/:id
  getOneProfile = async (id) => {
    return this.api.get(`/user/profile/${id}`);
  }


  // PUT /api/examples/:id
  updateOneProfile = async (id, requestBody) => {
    return this.api.put(`/user/profile/edit/${id}`, requestBody);
  }

  // DELETE /api/examples/:id
  deleteProject = async (id) => {
    return this.api.delete(`/profile/delete/${id}`);
  } 

}

// Create one instance of the service
const userService = new UserService();

export default userService;