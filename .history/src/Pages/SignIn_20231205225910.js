import React, { useState } from 'react'
import { MDBBtn} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const SignIn = () => {  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputs, setInputs] = useState({
    emailadress: "",
    password: ""
  });
  const [action_user,setAction_user] = useState({
    login:'',
     name:"", 
     surname:"",
      email:"", 
      action:'',
       action_time}
  })
  const navigate=useNavigate()
  const {emailadress,password } = inputs;
  const [error, setError] = useState('');
  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e)=> {
    e.preventDefault();
    try {
      const body = {emailadress ,password};
      const response = await fetch(
        "http://localhost:8000/api/authentication/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();
      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        const config = {
          headers: {
            Authorization: localStorage.token,
            'Content-Type': 'application/json', 
          },
        };
        const response = await axios.get('http://localhost:8000/api/user/profile', config);
        const usertoget = response.data;

        setIsAuthenticated(true);
        navigate('/dashboard');

      } else {
        setError('Email or password is invalid');
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
    <div>
  <title>SignIn</title>
  <meta charSet="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
  <link rel="stylesheet" href="Assets/css/style.css" />
  <section className="ftco-section">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center mb-5">
          <h2 className="heading-section">Welcome</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-5">
          <div className="login-wrap p-4 p-md-5">
            <div className="icon d-flex align-items-center justify-content-center">
              <span className="fa fa-user-o" />
            </div>
            <h3 className="text-center mb-4">Sign In</h3>
            <form  className="login-form" onSubmit={onSubmitForm}>
              <div className="form-group">
              {error && <div style={{ color: 'red' }}>{error}</div>}
                <input type="text" 
                        className="form-control rounded-left" 
                        name="emailadress"
                        placeholder='Email'
                        value={emailadress}
                        onChange={e => onChange(e)} />
              </div>
              <div className="form-group d-flex">
                <input type="password" 
                    className="form-control rounded-left" 
                    placeholder='Password'
                    name="password"
                    value={password}
                    onChange={e => onChange(e)}
                />
              </div>
              <div className='text-center text-md-start mt-4 pt-2'>
            <MDBBtn className="mb-0 px-5" size='lg' onClick={onSubmitForm}>Login</MDBBtn>
          </div>
              <div className="form-group d-md-flex">
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>

    </div>
  )
}
export default SignIn;