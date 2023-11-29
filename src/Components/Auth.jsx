import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Login from '../Assets/loginandreg.png'
import { Form } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerAPI } from '../Services/allAPI';
import { loginAPI } from '../Services/allAPI';
import { tokenAuthorisationContext } from '../Contexts/TokenAuth';

function Auth({ register }) {
    const {isAuthorized,setIsAuthorized} = useContext(tokenAuthorisationContext)
    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        username: "", email: "", password: ""
    })
    const isRegisterForm = register ? true : false

    const handleRegister = async (e) => {
        e.preventDefault()
        const { username, email, password } = userData
        if (!username || !email || !password) {
            toast.info("Please fill the form completely")

        } else {
            const result = await registerAPI(userData)
            if (result.status === 200) {
                toast.success(`${result.data.username} has registered successfully !!!`)
                setUserData({
                    username: "", email: "", password: ""
                })
                navigate('/login')
            } else {
                toast.warning(result.response.data)
                console.log(result)
            }
        }
    }
    const handleLogin = async(e)=>{
        e.preventDefault()
        const {email, password } = userData
        if (!email || !password) {
            toast.info("Please fill the form completely...")

        } else {
            const result = await loginAPI(userData)
            if (result.status === 200) {
                //toast.success(`${result.data.username} has registered successfully !!!`)
                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token",result.data.token)
                setIsAuthorized(true)
                setUserData({
                     email: "", password: ""
                })
                navigate('/')
            } else {
                toast.warning(result.response.data)
                console.log(result)
            }
        }
    }
    return (
        <div style={{ width: '100%', height: '100vh' }} className='d-flex justify-content-center align-items-center'>
            <div className='w-75 container'>
                <Link to={'/'} ><i className="fa-solid fa-arrow-left"></i>Back to Home</Link>
                <div className='card shadow p-5 bg-success'>
                    <div className='row align-items-center'>
                        <div className='col-lg-6'>
                            <img src={Login} alt="Auth Image" srcset="" className='rounded-stsrt w-100' />
                        </div>
                        <div className='col-lg-6'>
                            <div className='d-flex align-items-center flex-column'>
                                <h1 style={{ fontSize: '30px' }} className='fw-bolder text-light'><i className="fa-brands fa-stack-overflow fa-beat"></i> Project Fair</h1>
                            </div>
                            <h5 className='fw-bolder mt-2 pb-3 text-light text-center'>
                                {
                                    isRegisterForm ? 'Sign up to Your Account' : 'Sign In Your Account '
                                }
                            </h5>
                            <Form className='text-light w-100'>
                                {
                                    isRegisterForm &&
                                    <Form.Group className="mb-3" controlId="ForBasicName">
                                        <Form.Control type="text" placeholder="username"
                                            value={userData.username}
                                            onChange={e => setUserData({ ...userData, username: e.target.value })} />
                                    </Form.Group>
                                }
                                <Form.Group className="mb-3" controlId="ForBasicEmail">
                                    <Form.Control type="email" placeholder="Email"
                                        value={userData.email}
                                        onChange={e => setUserData({ ...userData, email: e.target.value })} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="ForBasicPassword">
                                    <Form.Control type="Password" placeholder="Password"
                                        value={userData.password}
                                        onChange={e => setUserData({ ...userData, password: e.target.value })} />
                                </Form.Group>

                                {
                                    isRegisterForm ?
                                        <div>
                                            <button className='btn btn-light mb-2' onClick={(e) => handleRegister(e)}>Register</button>
                                            <p>Already have an Account? Click here to <Link to={'/login'}>Login</Link></p>
                                        </div> :
                                        <div>
                                            <button onClick={handleLogin} className='btn btn-light mb-2'>Login</button>
                                            <p>New User? Click here to <Link to={'/register'}>Register</Link></p>
                                        </div>

                                }
                            </Form>
                        </div>
                    </div>

                </div>
            </div>
            <ToastContainer position='top-right' theme='colored' />
        </div>
    )
}

export default Auth