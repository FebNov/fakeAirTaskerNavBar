// const signUp = ({ email, password, }) =>
//   fetch("http://localhost:3000/api/users", {
//     method: "POST",
//     body: JSON.stringify({
//       email,
//       password,
      
//     }),
//     headers: {
//       "content-type": "application/json",
//     },
//   });
// export default signUp;
import api from '../../lib/api';
const signUp = ({email,password,}) => api.post('/users', {
    email,
    password,
  });
  
  export default signUp;