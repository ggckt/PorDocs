import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
function Blogs(props) {
    const [blogs, setblogs] = useState([])
    const [question, setquestion] = useState([])
    const [blogLoaded, setblogLoaded] = useState(false)
    const [questionLoaded, setquestionLoaded] = useState(false)
    const [pageno, setpageno] = useState(1)
    useEffect(() => {

        axios.get(`https://pordocs.herokuapp.com/api/question/page/${Math.max(props.match.params.pageno, 1)}`)
            .then((res) => {
                setquestion(res.data)
                setquestionLoaded(true)
                setpageno(Math.max(props.match.params.pageno, 1))
            })
            .catch((err) => console.log(err))

        axios.get(`https://pordocs.herokuapp.com/api/blog/page/1`)
            .then((res) => {
                setblogs(res.data)
                setblogLoaded(true)
            })
            .catch((err) => console.log(err))
    }, [props.match.params.pageno])

    const next = () => {
        window.scrollTo(0, 0)
        axios.get(`https://pordocs.herokuapp.com/api/question/page/${pageno + 1}`)
            .then((res) => {
                props.history.push(`/question/page/${pageno + 1}`)
                setquestion(res.data)
                setpageno(pageno + 1)
                setquestionLoaded(true)
            })
            .catch((err) => console.log(err))
    }
    const prev = () => {
        window.scrollTo(0, 0)
        axios.get(`https://pordocs.herokuapp.com/api/question/page/${Math.max(pageno - 1, 1)}`)
            .then((res) => {
                setquestion(res.data)
                setpageno(Math.max(pageno - 1, 1))
                props.history.push(`/question/page/${Math.max(pageno - 1, 1)}`)
                setquestionLoaded(true)
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="container-fluid">
            <div className="row mt-4">
                <div className="col-md-9 ps-md-4">
                    {
                        !questionLoaded ? <div className="d-flex justify-content-center mt-5">
                            <div className="spinner-grow text-primary" role="status"></div>
                            <div className="spinner-grow text-warning" role="status"></div>
                            <div className="spinner-grow text-info" role="status"></div>
                        </div>
                            : null
                    }
                    {
                        question.map((q) => {
                            return (
                                <div key={q._id} >
                                    <div className="list-group-item list-group-item-action shadow-lg mb-3 bg-white rounded">

                                        <Link to={`/question/${q._id}`} className="flex-column align-items-start" style={{ textDecoration: "none" }}>
                                            <div className="d-flex w-100 justify-content-between">
                                                <h4 className="mb-1 text-dark pt-3">{q.title}</h4>
                                            </div>
                                            <p className="mb-1 trunc text-dark mt-2">{q.description}</p>
                                        </Link>
                                        <Link to={`/profile/${q.userid}`} style={{ textDecoration: "none" }}>
                                            <small className="text-muted">By {q.username}</small>
                                        </Link>
                                        <Link to={`/question/${q._id}`} style={{ textDecoration: "none" }}>
                                            <p className="text-center text-info">Read More</p>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <br></br>
                    <nav>
                        <ul className="pagination justify-content-center">
                            <li className="page-item"><button className="page-link bg-dark text-white" onClick={prev} >Previous</button></li>
                            <li className="page-item"><button className="page-link bg-dark text-white" >{pageno}</button></li>
                            <li className="page-item"><button className="page-link bg-dark text-white" onClick={next}>Next</button></li>
                        </ul>
                    </nav>
                </div>
                <div className="col-md-3 mt-4 mt-md-5">
                    <h4 className="mt-md-5 text-center">Recent Blogs</h4>
                    <div className="list-group">
                        {
                            !blogLoaded ? <div className="d-flex justify-content-center mt-5">
                                <div className="spinner-grow spinner-grow-sm text-primary" role="status"></div>
                                <div className="spinner-grow spinner-grow-sm text-warning" role="status"></div>
                                <div className="spinner-grow spinner-grow-sm text-info" role="status"></div>
                            </div>
                                : null
                        }
                        {
                            blogs.map((blog) => {
                                return <li key={blog._id} className="list-group-item list-group-item-action list-group-item-light ">
                                    <Link to={`/blog/${blog._id}`} style={{ textDecoration: 'none' }}  > {blog.title}</Link>
                                </li>
                            })
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Blogs
