import React, { useState } from 'react'
import { Col,Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import titleImage from '../Assets/3d-render-illustration-of-project-management-finance-icon-png.webp'
import ProjectCard from '../Components/ProjectCard'
import { useEffect } from 'react'
import { homeProjectAPI } from '../Services/allAPI'

function Home() {
  const [loggedin,setLoggedin] = useState(false)
  const [homeProjects,setHomeProjects] = useState([])

  const getHomeProjects = async()=>{
    const result = await homeProjectAPI()
    if(result.status===200){
      setHomeProjects(result.data)
    }
    else{
      console.log(result);
      console.log(result.response.data);
    }
  }
  // console.log(homeProjects);

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setLoggedin(true)
    }
    else{
      setLoggedin(false)
    }

    // api call
    getHomeProjects()
  },[])
  
  return (
    <>
    {/* landin section */}
      <div className='container-fluid rounded' style={{width:'100%', height:'100vh',backgroundColor:'#90ee90'}}>
        <Row className='align-items-center p-5'>
          <Col sm={12} md={6}>
            <h1 style={{fontSize:'80px'}} className='fw-bolder text-light'><i className="fa-brands fa-stack-overflow fa-beat"></i> Project Fair</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque eveniet iste rerum. Libero labore ad ipsum voluptates pariatur. Sunt error nobis ab pariatur temporibus veniam, numquam quidem veritatis harum quibusdam!</p>
          { loggedin?
            <Link to={'/dashboard'} className='btn btn-warning'>Manage your Project<i className="fa-solid fa-arrow-right-long ms-1"></i></Link> :

            <Link to={'/login'} className='btn btn-warning'>Start to Explore<i className="fa-solid fa-arrow-right-long ms-1"></i></Link>
          }
          </Col>
          <Col sm={12} md={6}>
          <img style={{marginTop:'100px'}} className='w-75' src={titleImage} />
          </Col>

        </Row>
      </div>
      {/* All Projects */}
      <div className='all-projects mt-5'>
        <h1 className='text-center mb-5'>Explore Our Projects</h1>
        <marquee scrollAmount={25}>
          <div className='d-flex justify-content-between'>
            { homeProjects?.length>0?homeProjects.map(project=>(
              <div className='me-5'>
              <ProjectCard project={project} />
            </div>
            )):null
            }
          </div>

        </marquee>

        <div className='text-center mt-5 mb-5'><Link to={'/projects'} >View More Projects</Link></div>
      </div>
    </>
  )
}

export default Home