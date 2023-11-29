import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { deleteProjectAPI, userProjectAPI } from '../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectResponseContext, editProjectResponseContext } from '../Contexts/ContextShare';
import EditProject from './EditProject';

function MyProjects() {
    const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)
    const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
    const [userProjects,setUserProjects] = useState([])
    const getUserProjects = async ()=>{
        if(sessionStorage.getItem("token")){
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Contenet-Type": "application/json",
                "Authorization": `Bearer ${token}`
              }
            const result = await userProjectAPI(reqHeader)
            if(result.status===200){
                setUserProjects(result.data)
            }
            else{
                console.log(result);
                toast.warning(result.response.data)
            }
        }
    } 

    useEffect(()=>{
        getUserProjects()
    }, [addProjectResponse,editProjectResponse])
    // console.log(userProjects);

    const handleDelet = async (id)=>{
        const token = sessionStorage.getItem("token")
        const reqHeader = {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`
        }
        const result = await deleteProjectAPI(id,reqHeader)
        if(result.status===200){
        // page reload
        getUserProjects()
        }
        else{
            toast.error(result.response.data)
        }
    }

    return (
        <div className='card shadow p-3 mt-3'>
            <div className='d-flex'>
                <h3>My Projects</h3>
                <div className="ms-auto"> <AddProject /> </div>
            </div>
            {
                // addProjectResponse.title ? <Alert className='bg-success' dismissible> <span className='fw-bolder text-danger'>{addProjectResponse.title}</span>added successfully... </Alert>:null
            }
            <div className='mt-4'>
                {/* collection of user project */}
                { userProjects?.length>0? userProjects.map(project=>(
                    <div className="border d-flex align-item-center text-primary mb-2 rounded p-2">
                    <h5>{project.title}</h5>
                    <div className="icon ms-auto d-flex">
                        <EditProject Project={project} />
                        <a href={`${project.github}`} target="_blank" className='btn'><i class="fa-brands fa-github fa-2x"></i></a>
                        <button onClick={()=>handleDelet(project._id)} className='btn'><i class="fa-sharp fa-solid fa-trash fa-2x"></i></button>
                    </div>
                </div>
                )):
                <p className="text-danger fw-bolder fs-5">No Project Uploaded Yet...</p>
                }
            </div>
            <ToastContainer position='top-right' theme='colored' />
        </div>
    )
}

export default MyProjects