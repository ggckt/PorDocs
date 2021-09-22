import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function AdminPanel(props) {

    const [blogs, setblogs] = useState([])
    const [questions, setquestions] = useState([])
    const [submitting, setsubmitting] = useState(false)
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.get("http://localhost:5000/api/blog/adminpendingblogs/", { headers: { "x-access-token": token } })
                .then((res) => {
                    setblogs(res.data)
                })
                .catch((err) => console.log(err))

            axios.get("http://localhost:5000/api/question/adminpendingquestions/", { headers: { "x-access-token": token } })
                .then((res) => {
                    setquestions(res.data)
                })
                .catch((err) => console.log(err))
        }
    }, [props.isLogedin])

    const deleteBlog = (blogid) => {
        setsubmitting(true)
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.delete(`http://localhost:5000/api/blog/adminpendingblogs/${blogid}`, { headers: { "x-access-token": token } })
                .then((res) => {
                    const blogPending = blogs.filter((blog) => { return blog._id !== blogid })
                    setblogs(blogPending)
                    setsubmitting(false)
                })
                .catch((err) => console.log(err))
        }
        else {
        }
    }
    const approveBlog = (blogid) => {
        setsubmitting(true)
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.put(`http://localhost:5000/api/blog/adminpendingblogs/${blogid}`, {}, { headers: { "x-access-token": token } })
                .then((res) => {
                    const blogPending = blogs.filter((blog) => { return blog._id !== blogid })
                    setblogs(blogPending)
                    setsubmitting(false)
                })
                .catch((err) => console.log(err))
        }
        else {
        }
    }
    const deleteQuestion = (questionid) => {
        setsubmitting(true)
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.delete(`http://localhost:5000/api/question/adminpendingquestions/${questionid}`, { headers: { "x-access-token": token } })
                .then((res) => {
                    const questionPending = questions.filter((question) => { return question._id !== questionid })
                    setquestions(questionPending)
                    setsubmitting(false)
                })
                .catch((err) => console.log(err))
        }
        else {
        }
    }
    const approveQuestion = (questionid) => {
        setsubmitting(true)
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.put(`http://localhost:5000/api/question/adminpendingquestions/${questionid}`, {}, { headers: { "x-access-token": token } })
                .then((res) => {
                    const questionPending = questions.filter((question) => { return question._id !== questionid })
                    setquestions(questionPending)
                    setsubmitting(false)
                })
                .catch((err) => console.log(err))
        }
        else {
        }
    }

    return (
        <div className="container-fluid table-responsive ">
            <h4 className="mt-4 text-center ">Pending Blogs</h4>
            <table className="mt-2 table table-bordered table-hover table-striped">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Blog Title</th>
                        <th scope="col">Blog Link</th>
                        <th scope="col">Approve It</th>
                        <th scope="col">Delete It</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        blogs.map((blog) => {
                            return (
                                <tr key={blog._id}>
                                    <td>{blog.title}</td>
                                    <td><Link to={`/blog/${blog._id}`} className="fs-5">Link</Link></td>
                                    <td><button disabled={submitting} onClick={() => approveBlog(blog._id)} className="ps-2 btn btn-sm pt-0 pb-0 text-success fs-5" >Approve</button></td>
                                    <td><button disabled={submitting} onClick={() => deleteBlog(blog._id)} className="ps-2 btn btn-sm pt-0 pb-0 text-danger fs-5" >Delete</button></td>
                                </tr>)
                        })
                    }
                </tbody>
            </table>

            <h4 className="mt-4 text-center ">Pending Questions</h4>
            <table className="mt-2 table table-bordered table-hover table-striped">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Question Title</th>
                        <th scope="col">Question Link</th>
                        <th scope="col">Approve It</th>
                        <th scope="col">Delete It</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        questions.map((question) => {
                            return (
                                <tr key={question._id}>
                                    <td>{question.title}</td>
                                    <td><Link to={`/question/${question._id}`} className="fs-5">Link</Link></td>
                                    <td><button disabled={submitting} onClick={() => approveQuestion(question._id)} className="ps-2 btn btn-sm pt-0 pb-0 text-success fs-5" >Approve</button></td>
                                    <td><button disabled={submitting} onClick={() => deleteQuestion(question._id)} className="ps-2 btn btn-sm pt-0 pb-0 text-danger fs-5" >Delete</button></td>
                                </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AdminPanel