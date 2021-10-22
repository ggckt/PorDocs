import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from "react-helmet"

function ViewBlog(props) {
    const [blog, setblog] = useState([])
    const [question, setquestion] = useState([])
    const [commnets, setcommnets] = useState([])
    const [editMode, seteditMode] = useState("")
    const [deletedComment, setdeletedComment] = useState([])
    const [status, setstatus] = useState("")
    const [user, setuser] = useState({})
    const [blogLoaded, setblogLoaded] = useState(false)
    const [questionLoaded, setquestionLoaded] = useState(false)
    const [didlike, setdidlike] = useState(false)
    const [likeCount, setlikeCount] = useState(0)
    const [submitting, setsubmitting] = useState(false)
    useEffect(() => {

        window.scrollTo(0, 0)
        if (props.isLogedin) {
            setstatus("")
            const user = JSON.parse(localStorage.getItem('user'))
            setuser(user)
        }
        else {
            setstatus("")
            setuser("")
        }
    }, [props.isLogedin])

    useEffect(() => {
        axios.get(`https://pordocs.herokuapp.com/api/blog/${props.match.params.id}`)
            .then((res) => {
                setblog(res.data)
                setblogLoaded(true)
            })
            .catch((err) => console.log(err))
        axios.get(`https://pordocs.herokuapp.com/api/question/page/1`)
            .then((res) => {
                setquestion(res.data)
                setquestionLoaded(true)
            })
            .catch((err) => console.log(err))

        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.get(`https://pordocs.herokuapp.com/api/blog/${props.match.params.id}/didlike`, { headers: { "x-access-token": token } })
                .then((res) => {
                    setdidlike(res.data)
                })
                .catch((err) => console.log(err))
        }
        axios.get(`https://pordocs.herokuapp.com/api/blog/${props.match.params.id}/likecount`)
            .then((res) => {
                setlikeCount(res.data.count)
            })
            .catch((err) => console.log(err))

    }, [props.match.params.id])

    useEffect(() => {
        axios.get(`https://pordocs.herokuapp.com/api/blog/${props.match.params.id}/comment`)
            .then((res) => {
                setcommnets(res.data)
            })
            .catch((err) => console.log(err))
    }, [props.match.params.id, status, editMode, deletedComment])

    const editToggle = (id) => {
        if (editMode === "")
            seteditMode(id)
        else
            seteditMode("")
    }
    const commentSubmit = (e) => {
        e.preventDefault()
        setsubmitting(true)
        const comment = {
            username: e.target.username.value,
            comnt: e.target.comment.value
        }
        //const token = JSON.parse(localStorage.getItem('token'))
        //if (token) {
        axios.post(`https://pordocs.herokuapp.com/api/blog/${props.match.params.id}/comment`, comment)
            .then((res) => {
                e.target.comment.value = ""
                e.target.username.value = ""
                setstatus("")
                setstatus("Your Comment has been Successfully Submitted")
                setsubmitting(false)
            })
            .catch((err) => console.log(err))
        /*}
        else {
        }*/
    }
    const editComment = (e, comment_id) => {
        e.preventDefault()
        setsubmitting(true)
        const comment = {
            comnt: e.target.editComment.value,
        }
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.put(`https://pordocs.herokuapp.com/api/blog/${props.match.params.id}/comment/${comment_id}`, comment, { headers: { "x-access-token": token } })
                .then((res) => {
                    e.target.editComment.value = ""
                    seteditMode("")
                    setsubmitting(false)
                })
                .catch((err) => console.log(err))
        }
        else {
        }
    }
    const deleteComment = (comment_id) => {
        setsubmitting(true)
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.delete(`https://pordocs.herokuapp.com/api/blog/${props.match.params.id}/comment/${comment_id}`, { headers: { "x-access-token": token } })
                .then((res) => {
                    setdeletedComment(comment_id)
                    setsubmitting(false)
                })
                .catch((err) => console.log(err))
        }
        else {
        }
    }
    const deleteBlog = () => {
        setsubmitting(true)
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.delete(`https://pordocs.herokuapp.com/api/blog/${blog._id}`, { headers: { "x-access-token": token } })
                .then((res) => {
                    setsubmitting(false)
                    props.history.push('/')
                })
                .catch((err) => console.log(err))
        }
        else {
        }
    }
    const addLike = () => {
        setsubmitting(true)
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.post(`https://pordocs.herokuapp.com/api/blog/${blog._id}/like`, {}, { headers: { "x-access-token": token } })
                .then((res) => {
                    setlikeCount(res.data.count)
                    setdidlike(true)
                    setsubmitting(false)
                })
                .catch((err) => console.log(err))
        }
    }
    const removeLike = () => {
        setsubmitting(true)
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.delete(`https://pordocs.herokuapp.com/api/blog/${blog._id}/like`, { headers: { "x-access-token": token } })
                .then((res) => {
                    setdidlike(false)
                    setlikeCount(res.data.count)
                    setsubmitting(false)
                })
                .catch((err) => console.log(err))
        }
    }
    return (
        <div className="container-fluid">
            <Helmet>
                <title>{blog.title}</title>
                <meta name="description" content={blog.content} />
            </Helmet>
            <div className="row">
                <div className="col-md-9 ps-md-4">
                    {
                        !blogLoaded ? <div className="d-flex justify-content-center mt-5">
                            <div className="spinner-grow text-primary" role="status"></div>
                            <div className="spinner-grow text-warning" role="status"></div>
                            <div className="spinner-grow text-info" role="status"></div>
                        </div>
                            : null
                    }
                    <h3 className="text-center mt-2">{blog.title}</h3>
                    <p className="text-center  ms-1 ms-md-4">Posted by {blog.username} on {blog.date}</p>
                    {
                        user._id && user._id === blog.userid ?
                            <div className="ms-1 ms-md-4">
                                <Link to={`/blog/edit/${blog._id}`} className="fs-5">Edit</Link>
                                <button disabled={submitting} onClick={deleteBlog} className="ps-2 text-danger bg-white fs-5" >Delete</button>
                            </div> : null

                    }
                    <p style={{ whiteSpace: 'pre-wrap' }} className="fs-5 ms-1 me-1 ms-md-4 me-md-4 mt-4 ">{blog.content}</p>

                    {
                        !didlike ? <button disabled={submitting} className="ms-1 ms-md-4" onClick={addLike}><i className="bi bi-hand-thumbs-up fs-1 "></i></button> :
                            <button disabled={submitting} className="ms-1 ms-md-4" onClick={removeLike}><i className="bi bi-hand-thumbs-up-fill fs-1 "></i></button>
                    }
                    <p className="ms-1 ms-md-4">{likeCount}</p>
                    <form onSubmit={commentSubmit} className="ms-1 me-1 ms-md-4 me-md-4 card border-3">
                        {
                            status.length > 0 ?
                                <div className="alert alert-primary text-center" role="alert">
                                    {status}
                                </div> : null
                        }
                        <div className="card-body ">
                            <h5 className="card-title">Comment</h5>
                            <input name="username" required className="card-text mb-2 form-control border-2" placeholder="Enter Your Name"></input>
                            <textarea name="comment" placeholder="Type your Comment..." required className="card-text form-control h-60 border-2" ></textarea>
                            <button disabled={submitting} type='submit' className="btn btn-outline-primary mt-2">Submit</button>
                        </div>
                    </form>

                    <hr></hr>
                    <h5 className="ms-1 me-1 ms-md-4 me-md-4">Comments</h5>
                    {
                        commnets.map((comment) => {
                            return (
                                <div key={comment._id} id={comment._id} className="ms-2 me-2 ms-md-5 me-md-5 card-border-0">
                                    <div className="card-body p-0">
                                        {
                                            editMode === comment._id ? null :
                                                <div>
                                                    <p >{comment.comnt}</p>
                                                    <footer className="blockquote-footer">By <cite title="Source Title">{comment.username}</cite> On <cite title="Source Title">{comment.date}</cite></footer>
                                                </div>
                                        }
                                        {
                                            editMode === comment._id && user._id && user._id === comment.userid ?
                                                <form onSubmit={(e) => editComment(e, comment._id)}>
                                                    <textarea name="editComment" required defaultValue={comment.comnt} className="mt-1 card-text form-control h-60 border-2" ></textarea>
                                                    <button disabled={submitting} className="mt-1 mb-1 btn btn-sm btn-primary">submit</button>
                                                </form>
                                                : null
                                        }
                                        {
                                            user._id && user._id === comment.userid ? <div>
                                                {
                                                    editMode === comment._id ?
                                                        <button onClick={() => editToggle(comment._id)} className="btn btn-sm btn-warning me-2 mb-2 ">Cancel</button> :
                                                        <button onClick={() => editToggle(comment._id)} className="btn btn-sm btn-warning me-2 mb-2 ">Edit</button>
                                                }
                                                <button disabled={submitting} onClick={() => deleteComment(comment._id)} className="btn btn-sm btn-danger mb-2">Delete</button>

                                            </div> : null
                                        }

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="col-md-3 mt-4 mt-md-5">
                    <h4 className="mt-md-5 text-center">Latest Questions</h4>
                    {
                        !questionLoaded ? <div className="d-flex justify-content-center mt-5">
                            <div className="spinner-grow spinner-grow-sm text-primary" role="status"></div>
                            <div className="spinner-grow spinner-grow-sm text-warning" role="status"></div>
                            <div className="spinner-grow spinner-grow-sm text-info" role="status"></div>
                        </div>
                            : null
                    }
                    {
                        question.map((q) => {
                            return <li key={q._id} className="list-group-item list-group-item-action">
                                <Link to={`/question/${q._id}`} style={{ textDecoration: 'none' }}  > {q.title}</Link>
                            </li>
                        })
                    }
                </div>
            </div >
        </div >
    )
}

export default ViewBlog
