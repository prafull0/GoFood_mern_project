import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
function Signup() {

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    let navigate = useNavigate()
     const handleSubmit = async (e) =>{

        e.preventDefault()
        console.log(credentials);
        // console.log(JSON.stringify({ name: credentials.name, password: credentials.password, email: credentials.email, location: credentials.geolocation }));
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({ name: credentials.name, password: credentials.password, email: credentials.email, location: credentials.geolocation }) 
        })
        const json = await response.json()
        console.log(json);
        if (json.success) {
            //save the auth toke to local storage and redirect
            localStorage.setItem('token', json.authToken)
            navigate("/login")
      
          }
        
        if(!json.success){
            alert("enter valid credenttials")
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
                        <label htmlFor="name" className="form-label" >Username</label>
                        <input type="text" className="form-control" name="name" value={credentials.name} onChange={handleChange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" >Email</label>
                        <input type="email" className="form-control" name="email" value={credentials.email} onChange={handleChange}/>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={handleChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label" >Address</label>
                        <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={handleChange}/>

                    </div>

                    <button type="submit" className="btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>

                </form>
            </div>
        </>
    )
}

export default Signup;