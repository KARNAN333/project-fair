import React, { useContext } from 'react'
import { Container,Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { tokenAuthorisationContext } from '../Contexts/TokenAuth'

function Header({insideDashboard}) {
  const navigate = useNavigate()
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthorisationContext)
  const handleLogout = ()=>{
    // remove all existing user details from browser
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setIsAuthorized(false)
    // navigate to landing page
    navigate('/')
  }
  return (
    <>
   
    <Navbar style={{backgroundColor:'#90ee90'}} className='position-fixed top-0 w-100'>
        <Container> 
          <Navbar.Brand>
          <h1 style={{fontSize:'30px'}} className='fw-bolder text-light'><i className="fa-brands fa-stack-overflow fa-beat"></i> <Link to={'/'}>Project Fair</Link></h1>
          </Navbar.Brand>
          { insideDashboard && <button onClick={handleLogout} className="btn btn-linkms-auto text-primary fw-bolder fs-5">Logout<i class="fa-solid fa-arrow-right-from-bracket fa-fade ms-2"></i></button>}
        </Container>
      </Navbar>
    
    </>
  )
}

export default Header