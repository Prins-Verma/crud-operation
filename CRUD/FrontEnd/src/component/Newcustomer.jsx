import axios from 'axios';
import React from 'react';
import toast,  { Toaster } from 'react-hot-toast';
//import { ToastContainer, toast} from 'react-toastify';
//import '';


export default function Newcustomer() {
    // const notify = () => toast("Customer registered successfully.");
    const api = axios.create({
        baseURL: "http://localhost:4000"
    });
    async function createUser(e) {
       try{
        e.preventDefault();
        const formData = getFormData(e.target)
        let info = await api.post("/create", formData)
        console.log("info", info)
        toast.success(info.data.message);
       }catch(error) {
        // console.log(error.response.data.message)
        toast.error(error.response.data.message);
       }
            
    }

    function getFormData(form) {
        let formData = new FormData(form)
        formData = Object.fromEntries(formData.entries())
        return formData
    }
    return (
        <>
            <div className='container justify-content-sm-center'>
                <div className='row card bg-dark text-white mt-4 p-3 col-8'>
                    <h2 className='text-bold mb-2'>Customer Registration</h2><hr />
                    <div className='row ml-4'>
                        <div className='col-6'>
                            <form className='' onSubmit={(e) => { createUser(e) }}>
                                <div className="form-outline">
                                    <label >Customer Name</label>
                                    <input type="text" className="form-control" name="username" id="username" placeholder="customer name" />
                                </div>
                                <div className="form-outline">
                                    <label >Mobile</label>
                                    <input type="text" className="form-control" name="mobile" id="mobile" placeholder="mobile" />
                                </div>
                                <div className="form-outline">
                                    <label >Email</label>
                                    <input type="email" className="form-control" name="email" id="email" placeholder="email" />
                                </div>
                                <div className="form-outline">
                                    <label >Description</label>
                                    <input type="textarea" className="form-control" name="description" id="email" placeholder="description" />
                                </div>
                                <button type="submit" className="btn btn-success btn-block mb-4 mt-2">Add User</button>
                                
                              {/* Creatin g Toast for notification
                                <button onClick={notify}>Customer added successfully</button> */}
                            </form>
                        </div>
                        <div className='col-6'>
                            <img className="mt-4" src='https://static.wixstatic.com/media/361125_0e1ff8d37e34489d840467f381cc8978~mv2.png/v1/fill/w_300,h_225,al_c,usm_0.66_1.00_0.01/Register.png' />
                        </div>
                    </div>
                </div>

            </div>
             
                     
            
             
        </>
    )
}

