import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function UpdateCustomer() {
    let { userid } = useParams();
    const [user , setUser] = useState({})
    console.log("user_id",userid)
        const api = axios.create({
        baseURL: "http://localhost:4000"
    });
    function createUser(e) {
        e.preventDefault();
        const formData = getFormData(e.target)
        formData.user_id = userid
        api.post("/edit", formData)
            .then((data) => {
            })
    }

    function getFormData(form) {
        let formData = new FormData(form)
        formData = Object.fromEntries(formData.entries())
        return formData
    }

    async function alluser() {
        api.get(`/get_user/?user_id=${userid}`).then((data) => {
            console.log(data.data.data[0])
            setUser(data.data.data[0])
        })
    }

    useEffect(async() => {
      await alluser()
    },[])
    return (
        <div className='container justify-content-sm-center'>
            <div className='row card bg-dark text-white mt-4 p-3 col-8'>
                <h2 className='text-bold mb-2'>Customer Updation</h2><hr />
                <div className='row ml-4'>
                    <div className='col-6'>
                        <form className='' onSubmit={(e) => { createUser(e) }}>
                            <div className="form-outline">
                                <label >Customer Name</label>
                                <input type="text" className="form-control" defaultValue={user?.username} name="username" id="username" placeholder="customer name" />
                            </div>
                            <div className="form-outline">
                                <label >Mobile</label>
                                <input type="text" className="form-control" defaultValue={user?.mobile} name="mobile" id="mobile" placeholder="mobile" />
                            </div>
                            <div className="form-outline">
                                <label >Email</label>
                                <input type="email" className="form-control" defaultValue={user?.email} name="email" id="email" placeholder="email" />
                            </div>
                            <div className="form-outline">
                                <label >Description</label>
                                <input type="text" className="form-control" defaultValue={user?.description} name="description" id="email" placeholder="description" />
                            </div>
                            <button type="submit" className="btn btn-success btn-block mb-4 mt-2">Add User</button>
                        </form>
                    </div>
                    <div className='col-6'>
                        <img className="mt-4" src='https://static.wixstatic.com/media/361125_0e1ff8d37e34489d840467f381cc8978~mv2.png/v1/fill/w_300,h_225,al_c,usm_0.66_1.00_0.01/Register.png' />
                    </div>
                </div>
            </div>

        </div>
    )
}
