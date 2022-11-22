import React, { useEffect, useState } from 'react'
import axios from "axios"



function Createuser() {
    const api = axios.create({
        baseURL: "http://localhost:4000"
    });

    const [data, setData] = useState([])
    const [allUser, setallUser] = useState([])

    function createUser(e) {
        e.preventDefault();
        const formData = getFormData(e.target)
        api.post("/create", formData)
            .then((data) => {
                if (data) {
                    api.get(`/get_user?username=${formData.username}`).then(async (data) => {
                        setData(data.data.data)
                        await alluser()
                    })
                }
            })
    }

    function getFormData(form) {
        let formData = new FormData(form)
        formData = Object.fromEntries(formData.entries())
        return formData
    }

  
    async function alluser() {
        api.get(`/get_user`).then((data) => {
            setallUser(data.data.data)
        })
    }

    useEffect(async () => {
        const res = await alluser();
    }, []);

    return (
        <>
            <div>
                <section className="h-100 gradient-form" >
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-xl-10">
                                <div className="card rounded-3 text-black">
                                    <div className="row g-0">
                                        <div className="col-lg-6">
                                            <div className="card-body p-md-5 mx-md-4">

                                                <div className="text-center">
                                                    <img src="https://www.servicesats.com/wp-content/uploads/2021/09/ATS-Logo.png"
                                                        style={{ "width": "185px" }} alt="logo" />
                                                </div>


                                {/* onSubmit Button */}

                                                <form onSubmit={(e) => { createUser(e) }}>
                                                    <div className="form-outline">
                                                        <label >Customer Name</label>
                                                        <input type="text" className="form-control" name="username" id="username" placeholder="Customer Name" />
                                                    </div>
                                                    <div className="form-outline">
                                                        <label >Mobile</label>
                                                        <input type="text" className="form-control" name="mobile" id="mobile" placeholder="Mobile" />
                                                    </div>
                                                    <div className="form-outline">
                                                        <label >Email</label>
                                                        <input type="email" className="form-control" name="email" id="email" placeholder="Email" />
                                                    </div>
                                                    <div className="form-outline">
                                                        <label >Description</label>
                                                        <input type="text" className="form-control" name="description" id="description" placeholder="Description" />
                                                    </div>
                                                    <button type="submit" className="btn btn-primary btn-block mb-4 mt-2">Add User</button>
                                                </form>

                                            </div>
                                        </div>

                                        <div className="col justify-content-center">
                                            <div className="text-center">
                                                <h4 className='display-4'>New Customer</h4>
                                            </div>
                                            <table id="dtHorizontalExample" className="table table-striped table-sm" cellspacing="0"
                                                width="100%">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">S No</th>
                                                        <th scope="col">Customer Id</th>
                                                        <th scope="col">Customer Name</th>
                                                        <th scope="col">Mobile</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Created On</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data?.map((data, i) => (
                                                        <tr>
                                                            <th scope="col">i</th>
                                                            <td>{data.user_id}</td>
                                                            <td>{data.name}</td>
                                                            <td>{data.mobile}</td>
                                                            <td>{data.email}</td>
                                                            <td>{data.createdOn}</td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    
            {/* List of the Customers   */}
                                    
                                    <div className="row">
                                        <div className="col justify-content-center">
                                        <div className="text-center">
                                                <h4 className='display-4'>All Customer</h4>
                                            </div>
                                            <table id="dtHorizontalExample" className="table table-striped table-sm" cellspacing="0"
                                                width="100%">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">S No</th>
                                                        <th scope="col">Customer Id</th>
                                                        <th scope="col">Customer Name</th>
                                                        <th scope="col">Mobile</th>
                                                        <th scope="col">Email</th>
                                                        <th scope="col">Created On</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {allUser?.map((data, i) => (
                                                        <tr>
                                                            <th scope="col">i</th>
                                                            <td>{data.user_id}</td>
                                                            <td>{data.name}</td>
                                                            <td>{data.mobile}</td>
                                                            <td>{data.email}</td>
                                                            <td>{data.createdOn}</td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>


        </>
    )
}

export default Createuser;