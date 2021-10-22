import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function AdminPanel(props) {

    const [blogs, setblogs] = useState([])
    const [approvedblogs, setapprovedblogs] = useState([])
    const [questions, setquestions] = useState([])
    const [approvedquestions, setapprovedquestions] = useState([])
    const [comments, setcomments] = useState([])
    const [submitting, setsubmitting] = useState(false)
    const [users, setusers] = useState([])
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.get("https://pordocs.herokuapp.com/api/blog/adminpendingblogs/", { headers: { "x-access-token": token } })
                .then((res) => {
                    setblogs(res.data)
                })
                .catch((err) => console.log(err))
            axios.get("https://pordocs.herokuapp.com/api/blog/adminapprovedblogs/", { headers: { "x-access-token": token } })
                .then((res) => {
                    setapprovedblogs(res.data)
                })
                .catch((err) => console.log(err))

            axios.get("https://pordocs.herokuapp.com/api/question/adminpendingquestions/", { headers: { "x-access-token": token } })
                .then((res) => {
                    setquestions(res.data)
                })
                .catch((err) => console.log(err))

            axios.get("https://pordocs.herokuapp.com/api/question/adminapprovedquestions/", { headers: { "x-access-token": token } })
                .then((res) => {
                    setapprovedquestions(res.data)
                })
                .catch((err) => console.log(err))

            axios.get("https://pordocs.herokuapp.com/api/blog/adminpendingcomments/", { headers: { "x-access-token": token } })
                .then((res) => {
                    setcomments(res.data)
                })
                .catch((err) => console.log(err))

            axios.get("https://pordocs.herokuapp.com/api/user/alluser/", { headers: { "x-access-token": token } })
                .then((res) => {
                    setusers(res.data)
                })
                .catch((err) => console.log(err))
        }
    }, [props.isLogedin])

    const deleteBlog = (blogid) => {
        setsubmitting(true)
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.delete(`https://pordocs.herokuapp.com/api/blog/adminpendingblogs/${blogid}`, { headers: { "x-access-token": token } })
                .then((res) => {
                    const blogPending = blogs.filter((blog) => { return blog._id !== blogid })
                    setblogs(blogPending)
                    const blogApproved = approvedblogs.filter((blog) => { return blog._id !== blogid })
                    setapprovedblogs(blogApproved)
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
            axios.put(`https://pordocs.herokuapp.com/api/blog/adminpendingblogs/${blogid}`, {}, { headers: { "x-access-token": token } })
                .then((res) => {
                    const approve = blogs.filter((blog) => { return blog._id === blogid })

                    if (approve[0]) {
                        setapprovedblogs([approve[0], ...approvedblogs])
                        const blogPending = blogs.filter((blog) => { return blog._id !== blogid })
                        setblogs(blogPending)
                    }
                    const unapprove = approvedblogs.filter((blog) => { return blog._id === blogid })
                    if (unapprove[0]) {
                        setblogs([unapprove[0], ...blogs])
                        const blogApproved = approvedblogs.filter((blog) => { return blog._id !== blogid })
                        setapprovedblogs(blogApproved)
                    }
                    setsubmitting(false)
                })
                .catch((err) => console.log(err))
        }
        else {
        }
    }
    const deleteComment = (commentid) => {
        setsubmitting(true)
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.delete(`https://pordocs.herokuapp.com/api/blog/adminpendingcomments/${commentid}`, { headers: { "x-access-token": token } })
                .then((res) => {
                    const commentPending = comments.filter((comment) => { return comment._id !== commentid })
                    setcomments(commentPending)
                    setsubmitting(false)
                })
                .catch((err) => console.log(err))
        }
        else {
        }
    }
    const approveComment = (commentid) => {
        setsubmitting(true)
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.put(`https://pordocs.herokuapp.com/api/blog/adminpendingcomments/${commentid}`, {}, { headers: { "x-access-token": token } })
                .then((res) => {
                    const commentPending = comments.filter((comment) => { return comment._id !== commentid })
                    setcomments(commentPending)
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
            axios.delete(`https://pordocs.herokuapp.com/api/question/adminpendingquestions/${questionid}`, { headers: { "x-access-token": token } })
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
            axios.put(`https://pordocs.herokuapp.com/api/question/adminpendingquestions/${questionid}`, {}, { headers: { "x-access-token": token } })
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
    const deleteUser = (userid) => {
        setsubmitting(true)
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.delete(`https://pordocs.herokuapp.com/api/user/${userid}`, { headers: { "x-access-token": token } })
                .then((res) => {
                    const userRemaining = users.filter((user) => { return user._id !== userid })
                    setusers(userRemaining)
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

            <h4 className="mt-4 text-center ">Pending Comments</h4>
            <table className="mt-2 table table-bordered table-hover table-striped">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Comment Author</th>
                        <th scope="col">View Blog</th>
                        <th scope="col">View Comment</th>
                        <th scope="col">Approve It</th>
                        <th scope="col">Delete It</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        comments.map((comment) => {
                            return (
                                <tr key={comment._id}>
                                    <td>{comment.username}</td>
                                    <td><Link to={`/blog/${comment.blogId}`} className="fs-5">Blog Link</Link></td>
                                    <td>
                                        <div className="dropdown">
                                            <button className="btn btn-primary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                View Comment
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <h6 className="m-0 " >{comment.comnt}</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td><button disabled={submitting} onClick={() => approveComment(comment._id)} className="ps-2 btn btn-sm pt-0 pb-0 text-success fs-5" >Approve</button></td>
                                    <td><button disabled={submitting} onClick={() => deleteComment(comment._id)} className="ps-2 btn btn-sm pt-0 pb-0 text-danger fs-5" >Delete</button></td>
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

            <h4 className="mt-4 text-center ">Approved Blogs</h4>
            <table className="mt-2 table table-bordered table-hover table-striped">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Blog Title</th>
                        <th scope="col">Blog Link</th>
                        <th scope="col">UnApprove It</th>
                        <th scope="col">Delete It</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        approvedblogs.map((approvedblog) => {
                            return (
                                <tr key={approvedblog._id}>
                                    <td>{approvedblog.title}</td>
                                    <td><Link to={`/blog/${approvedblog._id}`} className="fs-5">Link</Link></td>
                                    <td><button disabled={submitting} onClick={() => approveBlog(approvedblog._id)} className="ps-2 btn btn-sm pt-0 pb-0 text-success fs-5" >UnApprove</button></td>
                                    <td><button disabled={submitting} onClick={() => deleteBlog(approvedblog._id)} className="ps-2 btn btn-sm pt-0 pb-0 text-danger fs-5" >Delete</button></td>
                                </tr>)
                        })
                    }
                </tbody>
            </table>
            <h4 className="mt-4 text-center ">Approved Questions</h4>
            <table className="mt-2 table table-bordered table-hover table-striped">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Question Title</th>
                        <th scope="col">Question Link</th>
                        <th scope="col">UnApprove It</th>
                        <th scope="col">Delete It</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        approvedquestions.map((approvedquestion) => {
                            return (
                                <tr key={approvedquestion._id}>
                                    <td>{approvedquestion.title}</td>
                                    <td><Link to={`/question/${approvedquestion._id}`} className="fs-5">Link</Link></td>
                                    <td><button disabled={submitting} onClick={() => approveQuestion(approvedquestion._id)} className="ps-2 btn btn-sm pt-0 pb-0 text-success fs-5" >UnApprove</button></td>
                                    <td><button disabled={submitting} onClick={() => deleteQuestion(approvedquestion._id)} className="ps-2 btn btn-sm pt-0 pb-0 text-danger fs-5" >Delete</button></td>
                                </tr>)
                        })
                    }
                </tbody>
            </table>
            <h4 className="mt-4 text-center ">All Users</h4>
            <table className="mt-2 table table-bordered table-hover table-striped">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">User Name</th>
                        <th scope="col">Profile Link</th>
                        <th scope="col">Delete It</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => {
                            return (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td><Link to={`/profile/${user._id}`} className="fs-5">Link</Link></td>
                                    <td><button disabled={submitting} onClick={() => deleteUser(user._id)} className="ps-2 btn btn-sm pt-0 pb-0 text-danger fs-5" >Delete</button></td>
                                </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default AdminPanel