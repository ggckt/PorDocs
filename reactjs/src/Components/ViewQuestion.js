import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function ViewQuestion(props) {
    const [blog, setblog] = useState([])
    const [question, setquestion] = useState([])
    const [answers, setanswers] = useState([])
    const [editMode, seteditMode] = useState("")
    const [deletedAnswer, setdeletedAnswer] = useState([])
    const [status, setstatus] = useState("You are not Logged In, Log In to Answer the Question")
    const [user, setuser] = useState({})
    const [blogLoaded, setblogLoaded] = useState(false)
    const [questionLoaded, setquestionLoaded] = useState(false)
    const [submitting, setsubmitting] = useState(false)
    useEffect(() => {

        window.scrollTo(0, 0)
        if (props.isLogedin) {
            setstatus("")
            const user = JSON.parse(localStorage.getItem('user'))
            setuser(user)
        }
        else {
            setstatus("You are not Logged In, Log In to Answer the Question")
            setuser("")
        }
    }, [props.isLogedin])

    useEffect(() => {
        axios.get(`https://pordocs.herokuapp.com/api/question/${props.match.params.id}`)
            .then((res) => {
                setquestion(res.data)
                setquestionLoaded(true)
            })
            .catch((err) => console.log(err))
        axios.get(`https://pordocs.herokuapp.com/api/blog/page/1`)
            .then((res) => {
                setblog(res.data)
                setblogLoaded(true)
            })
            .catch((err) => console.log(err))

    }, [props.match.params.id])

    useEffect(() => {
        axios.get(`https://pordocs.herokuapp.com/api/question/${props.match.params.id}/answer`)
            .then((res) => {
                setanswers(res.data)
            })
            .catch((err) => console.log(err))
    }, [props.match.params.id, status, editMode, deletedAnswer])

    const editToggle = (id) => {
        if (editMode === "")
            seteditMode(id)
        else
            seteditMode("")
    }
    const answerSubmit = (e) => {
        e.preventDefault()
        setsubmitting(true)
        const answer = {
            answer: e.target.answer.value,
        }
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.post(`https://pordocs.herokuapp.com/api/question/${props.match.params.id}/answer`, answer, { headers: { "x-access-token": token } })
                .then((res) => {
                    e.target.answer.value = ""
                    setstatus("")
                    setstatus("Your Answer has been Successfully Submitted")

                    setsubmitting(false)
                })
                .catch((err) => console.log(err))
        }
        else {
        }
    }
    const editAnswer = (e, answer_id) => {
        e.preventDefault()

        setsubmitting(true)
        const answer = {
            answer: e.target.editAnswer.value,
        }
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.put(`https://pordocs.herokuapp.com/api/question/${props.match.params.id}/answer/${answer_id}`, answer, { headers: { "x-access-token": token } })
                .then((res) => {
                    e.target.editAnswer.value = ""
                    seteditMode("")

                    setsubmitting(false)
                })
                .catch((err) => console.log(err))
        }
        else {
        }
    }
    const deleteAnswer = (answer_id) => {

        setsubmitting(true)
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.delete(`https://pordocs.herokuapp.com/api/question/${props.match.params.id}/answer/${answer_id}`, { headers: { "x-access-token": token } })
                .then((res) => {
                    setdeletedAnswer(answer_id)

                    setsubmitting(false)
                })
                .catch((err) => console.log(err))
        }
        else {
        }
    }
    const deleteQuestion = () => {

        setsubmitting(true)
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.delete(`https://pordocs.herokuapp.com/api/question/${question._id}`, { headers: { "x-access-token": token } })
                .then((res) => {

                    setsubmitting(false)
                    props.history.push('/')
                })
                .catch((err) => console.log(err))
        }
        else {
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-9 ps-md-4">
                    {
                        !questionLoaded ? <div className="d-flex justify-content-center mt-5">
                            <div className="spinner-grow text-primary" role="status"></div>
                            <div className="spinner-grow text-warning" role="status"></div>
                            <div className="spinner-grow text-info" role="status"></div>
                        </div>
                            : null
                    }
                    <h3 className="text-center mt-2">{question.title}</h3>
                    <p className="text-center  ms-1 ms-md-4">Asked by {question.username} on {question.date}</p>
                    {
                        user._id && user._id === question.userid ? <div className="ms-1 ms-md-4">
                            <Link to={`/question/edit/${question._id}`} className="fs-5">Edit</Link>
                            <button disabled={submitting} onClick={deleteQuestion} className="ps-2 text-danger bg-white fs-5" >Delete</button>
                        </div> : null
                    }
                    <p style={{ whiteSpace: 'pre-wrap' }} className="fs-5 ms-1 me-1 ms-md-4 me-md-4 mt-4 ">{question.description}</p>

                    <form onSubmit={answerSubmit} className="ms-1 me-1 ms-md-4 me-md-4 card border-3">
                        {
                            status.length > 0 ?
                                <div className="alert alert-primary text-center" role="alert">
                                    {status}
                                </div> : null
                        }
                        <div className="card-body">
                            <h5 className="card-title">Write an Answer</h5>
                            <textarea name="answer" required className="card-text form-control h-60 border-2" ></textarea>
                            <button disabled={submitting} type='submit' className="btn btn-outline-primary mt-2">Submit</button>
                        </div>
                    </form>

                    <hr></hr>
                    <h5 className="ms-1 me-1 ms-md-4 me-md-4">Answers</h5>
                    {
                        answers.map((answer) => {
                            return (
                                <div key={answer._id} className="ms-2 me-2 ms-md-5 me-md-5 card-border-0">
                                    <div className="card-body p-0">
                                        {
                                            editMode === answer._id ? null :
                                                <div>
                                                    <p >{answer.answer}</p>
                                                    <footer className="blockquote-footer">By <cite title="Source Title">{answer.username}</cite> On <cite title="Source Title">{answer.date}</cite></footer>
                                                </div>
                                        }
                                        {
                                            editMode === answer._id && user._id && user._id === answer.userid ?
                                                <form onSubmit={(e) => editAnswer(e, answer._id)}>
                                                    <textarea name="editAnswer" required defaultValue={answer.answer} className="mt-1 card-text form-control h-60 border-2" ></textarea>
                                                    <button disabled={submitting} className="mt-1 mb-1 btn btn-sm btn-primary">submit</button>
                                                </form>
                                                : null
                                        }
                                        {
                                            user._id && user._id === answer.userid ? <div>
                                                {
                                                    editMode === answer._id ?
                                                        <button onClick={() => editToggle(answer._id)} className="btn btn-sm btn-warning me-2 mb-2 ">Cancel</button> :
                                                        <button onClick={() => editToggle(answer._id)} className="btn btn-sm btn-warning me-2 mb-2 ">Edit</button>
                                                }
                                                <button disabled={submitting} onClick={() => deleteAnswer(answer._id)} className="btn btn-sm btn-danger mb-2">Delete</button>

                                            </div> : null
                                        }

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="col-md-3 mt-4 mt-md-5">
                    <h4 className="mt-md-5 text-center">Latest Blogs</h4>
                    {
                        !blogLoaded ? <div className="d-flex justify-content-center mt-5">
                            <div className="spinner-grow spinner-grow-sm text-primary" role="status"></div>
                            <div className="spinner-grow spinner-grow-sm text-warning" role="status"></div>
                            <div className="spinner-grow spinner-grow-sm text-info" role="status"></div>
                        </div>
                            : null
                    }
                    {
                        blog.map((b) => {
                            return <li key={b._id} className="list-group-item list-group-item-action">
                                <Link to={`/blog/${b._id}`} style={{ textDecoration: 'none' }}  > {b.title}</Link>
                            </li>
                        })
                    }
                </div>
            </div >
        </div >
    )
}

export default ViewQuestion
