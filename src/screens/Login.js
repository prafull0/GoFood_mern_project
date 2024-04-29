import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'



export default function Login() {
  const [credentials, setcredentials] = useState({email: "", password: ""})
  let navigate = useNavigate();
     const handleSubmit = async (e) =>{

        e.preventDefault()
        console.log(credentials);
        // console.log(JSON.stringify({password: credentials.password, email: credentials.email}));
        const response = await fetch("http://localhost:5000/api/loginuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({password: credentials.password, email: credentials.email}) 
        })
        const json = await response.json()
        console.log(json);
        if(!json.success){
            alert("enter valid credenttials")
        }
        if(json.success){
          localStorage.setItem("userEmail",credentials.email)
          localStorage.setItem("authToken",json.authToken)
         console.log(localStorage.getItem("authToken")); 
          navigate("/")
          
        }
    }
    const handleChange = (event) =>{
        
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
        
        // console.log(credentials.name);
          
    }
  return (
    <>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" >Email</label>
                        <input type="email" className="form-control" name="email" value={credentials.email} onChange={handleChange}/>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={handleChange}/>
                    </div>
                   

                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link to="/createuser" className="m-3 btn btn-danger">I'm a new user</Link>

                </form>
            </div>
        </>
  )
}
