import React, { useState, useEffect } from 'react'
import axios from 'axios'

function EditBlog(props) {
    const [blog, setblog] = useState({ title: "", content: "" })
    const [submitting, setsubmitting] = useState(false)
    useEffect(() => {
        axios.get(`http://localhost:5000/api/blog/${props.match.params.id}`)
            .then((res) => {
                setblog(res.data)
            })
            .catch((err) => console.log(err))

    }, [props.match.params.id])

    const submitBlog = (e) => {
        e.preventDefault()
        setsubmitting(true)
        const blog = {
            title: e.target.title.value,
            content: e.target.content.value
        }
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            blog.title = e.target.title.value
            blog.content = e.target.content.value
            axios.put(`http://localhost:5000/api/blog/${props.match.params.id}`, blog, { headers: { "x-access-token": token } })
                .then((res) => {
                    e.target.title.value = ""
                    e.target.content.value = ""
                    setsubmitting(false)
                })
                .catch((err) => console.log(err))
        }
        else {
        }
    }

    return (
        <form className="m-3 m-sm-5 text-center" onSubmit={submitBlog}>
            <div className="form-floating mb-3">
                <input required defaultValue={blog.title} type="text" name="title" className="form-control" id="floatingInput" placeholder="Blog Title"></input>
                <label>Blog Title</label>
            </div>
            <div className="form-floating">
                <textarea defaultValue={blog.content} required className="form-control h-50" name="content" rows="20" placeholder="Content" id="floatingTextarea"></textarea>
                <label>Content</label>
            </div>
            {
                props.isLogedin && !submitting ?
                    <button type="submit" className="btn btn-outline-dark center mt-3">Submit</button>
                    : <button disabled type="submit" className="btn btn-outline-dark center mt-3">Submit</button>
            }

        </form >
    )
}

export default EditBlog
