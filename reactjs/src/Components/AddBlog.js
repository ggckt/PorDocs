import React, { useState, useEffect } from 'react'
import axios from 'axios'

function AddBlog(props) {
    const [status, setstatus] = useState("You are not Logged In, Log In to submit a blog")
    const [submitting, setsubmitting] = useState(false)
    useEffect(() => {
        if (props.isLogedin)
            setstatus("")
        else
            setstatus("You are not Logged In, Log In to submit a blog")
    }, [props.isLogedin])
    const submitBlog = (e) => {
        e.preventDefault()
        setsubmitting(true)
        const blog = {
            title: e.target.title.value,
            content: e.target.content.value
        }
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.post("https://pordocs.herokuapp.com/api/blog/", blog, { headers: { "x-access-token": token } })
                .then((res) => {
                    e.target.title.value = ""
                    e.target.content.value = ""
                    setstatus("You Blog has been Successfully Submitted")
                    setsubmitting(false)
                })
                .catch((err) => console.log(err))
        }
        else {
        }
    }
    return (
        <form className="m-3 m-sm-5 text-center" onSubmit={submitBlog}>
            {
                status.length > 0 ?
                    <div className="alert alert-primary" role="alert">
                        {status}
                    </div> : null
            }
            <div className="form-floating mb-3 border border-primary">
                <input required type="text" name="title" className="form-control" id="floatingInput" placeholder="Blog Title"></input>
                <label>Blog Title</label>
            </div>
            <div className="form-floating border border-primary">
                <textarea required className="form-control h-50" name="content" rows="20" placeholder="Content" id="floatingTextarea"></textarea>
                <label>Content</label>
            </div>
            {
                props.isLogedin && !submitting ?
                    <button type="submit" className="btn btn-outline-primary center mt-3">Submit</button>
                    : <button disabled type="submit" className="btn btn-outline-primary center mt-3">Submit</button>
            }

        </form >
    )
}

export default AddBlog
