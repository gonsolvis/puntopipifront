import axios from 'axios';

class CommentService {
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
  createOneComment = async (requestBody) => {
    return this.api.post('/comment/new', requestBody);
  }

  // // GET /api/examples
  // getAllComments = async (id) => {
  //   return this.api.get(`/comment/${id}`);
  // }


//   // GET /api/examples/:id
//   getOneComment = async (id) => {
//     return this.api.get(`/api/examples/${id}`);
//   }

//   // PUT /api/examples/:id
//   updateOneComment = async (id, requestBody) => {
//     return this.api.put(`/api/examples/${id}`, requestBody);
//   }

  // DELETE /api/examples/:id
  deleteComment = async (id) => {
    return this.api.delete(`/comment/delete/${id}`);
  } 


}

// Create one instance of the service
const commentService = new CommentService();

export default commentService;