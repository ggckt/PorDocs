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
        axios.get(`http://localhost:5000/api/blog/page/${Math.max(props.match.params.pageno, 1)}`)
            .then((res) => {
                setblogs(res.data)
                setblogLoaded(true)
                setpageno(Math.max(props.match.params.pageno, 1))
            })
            .catch((err) => console.log(err))

        axios.get(`http://localhost:5000/api/question/page/1`)
            .then((res) => {
                setquestion(res.data)
                setquestionLoaded(true)
            })
            .catch((err) => console.log(err))
    }, [props.match.params.pageno])

    const next = () => {
        window.scrollTo(0, 0)
        axios.get(`http://localhost:5000/api/blog/page/${pageno + 1}`)
            .then((res) => {
                props.history.push(`/blog/page/${pageno + 1}`)
                setblogs(res.data)
                setpageno(pageno + 1)
                setblogLoaded(true)
            })
            .catch((err) => console.log(err))
    }
    const prev = () => {
        window.scrollTo(0, 0)
        axios.get(`http://localhost:5000/api/blog/page/${Math.max(pageno - 1, 1)}`)
            .then((res) => {
                setblogs(res.data)
                setpageno(Math.max(pageno - 1, 1))
                props.history.push(`/blog/page/${Math.max(pageno - 1, 1)}`)
                setblogLoaded(true)
            })
            .catch((err) => console.log(err))
    }
    return (
        <div className="container-fluid">
            <div className="row mt-4">
                <div className="col-md-9 ps-md-4">
                    {
                        !blogLoaded ? <div className="d-flex justify-content-center mt-5">
                            <div className="spinner-grow text-primary" role="status"></div>
                            <div className="spinner-grow text-warning" role="status"></div>
                            <div className="spinner-grow text-info" role="status"></div>
                        </div>
                            : null
                    }
                    {
                        blogs.map((blog) => {
                            return (
                                <Link key={blog._id} to={`/blog/${blog._id}`} className="list-group-item list-group-item-action flex-column align-items-start shadow-lg mb-3 bg-white rounded">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h4 className="mb-1 pt-3">{blog.title}</h4>
                                    </div>
                                    <p className="mb-1 trunc mt-2">{blog.content}</p>
                                    <small className="text-muted">By {blog.username}</small>
                                    <p className="text-center text-info">Read More</p>
                                </Link>
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
                    <h4 className="mt-md-5 text-center">Recent Questions</h4>
                    <div className="list-group">
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
                                return <li key={q._id} className="list-group-item list-group-item-action list-group-item-light ">
                                    <Link to={`/question/${q._id}`} style={{ textDecoration: 'none' }}  > {q.title}</Link>
                                </li>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blogs
