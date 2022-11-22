import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Allcustomer() {
    const [allUser, setallUser] = useState([])

    const api = axios.create({
        baseURL: "http://localhost:4000"
    })

    async function alluser() {
        api.get(`/get_user`).then((data) => {
            console.log(data)
            setallUser(data.data.data)
        })
    }

    useEffect(async () => {
        await alluser()
    }, [])

    return (
        <>
                <div class="container py-5">
                <div class="row text-center">
                    <div class="col-lg-8 mx-auto">
                        <h1 class="display-4">Registered Customer</h1>
                    </div>
                </div>
            </div>

            
            <div class="container">
                <div class="row text-center">
                    {
                        allUser?.map((user, i) => (
                            <div class="col-xl-3 col-sm-6 mb-3">
                                <div class="bg-dark text-white rounded shadow-sm py-5 px-4">
                                    {/* <img src="https://bootstrapious.com/i/snippets/sn-team/teacher-1.jpg" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" /> */}
                                    <h5 class="mb-0">{user.username}</h5>
                                    <span class="small text-uppercase">{user.mobile}</span><hr />
                                    <span class="small text-uppercase">{user.email}</span>
                                    <span class="small text-uppercase">{user.description}</span>
                                    <div class="btn-group">
                                        <button type="button" class="btn-sm m-1 btn-info"><Link className='text-white' to={`/edit/${user.user_id}`}>Update</Link></button>
                                        <button type="button" class="btn-sm m-1 btn-success"><Link className='text-white' to={`/details/${user.user_id}`}>Details</Link></button>
                                        <button type="button" class="btn-sm m-1 btn-danger"
                                            onClick={async (e) => {
                                               await api.get(`/customer/${user.user_id}`).then((data) => {
                                                })
                                            }}>Delete</button>
                                    </div>
                                </div>
                            </div>  
                        ))
                    }
                </div>
            </div>
        </>
    )
}
