
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
//import {  allUser} from "module";

export default function CustomerDetails() {
  let { userid } = useParams();
  const [user, setUser] = useState({})
  console.log("user_id", userid)
  const api = axios.create({
    baseURL: "http://localhost:4000"
  });

  //   function createUser(e) {
  //     e.preventDefault();
  //     const formData = getFormData(e.target)
  //     formData.user_id = userid
  //     api.post("/edit", formData)
  //         .then((data) => {
  //         })
  // }

  function getFormData(form) {
    let formData = new FormData(form)
    formData = Object.fromEntries(formData.entries())
    return formData
  }

  async function fnduser() {
    api.get(`/get_user/?user_id=${userid}`).then((data) => {
      console.log(data)
      setUser(data.data.data[0])
    })
  }

  useEffect(async () => {
    await fnduser()
  }, [])
  return (
    <>
      <div class="container py-5">
        <div class="row text-center">
          <div class="col-lg-8 mx-auto">
            <h1 class="display-4">Customer details</h1>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row text-center">
          <div class="col-xl-3 col-sm-6">
            <div class="bg-dark text-white rounded shadow-sm py-5 px-4">
              {/* <img src="https://bootstrapious.com/i/snippets/sn-team/teacher-1.jpg" alt="" width="100" class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm" /> */}
              <h5 class="mb-0">{user?.username}</h5>
              <span class="small text-uppercase">{user?.mobile}</span><hr />
              <span class="small text-uppercase">{user?.email}</span>
              <span class="small text-uppercase">{user?.description}</span>
            </div>
            <Link className='btn-sm btn-info' to='/'>Back To home</Link>
          </div>
        </div>
      </div>
    </>
  )
}
