import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
function Home(props) {
    const [blogs, setblogs] = useState([])
    const [question, setquestion] = useState([])
    const [blogLoaded, setblogLoaded] = useState(false)
    const [questionLoaded, setquestionLoaded] = useState(false)

    useEffect(() => {
        axios.get(`https://pordocs.herokuapp.com/api/blog/page/1`)
            .then((res) => {
                setblogs(res.data)
                setblogLoaded(true)
            })
            .catch((err) => console.log(err))


        axios.get(`https://pordocs.herokuapp.com/api/question/page/1`)
            .then((res) => {
                setquestion(res.data)
                setquestionLoaded(true)
            })
            .catch((err) => console.log(err))
    }, [props.match.params.pageno])

    return (
        <div>
            <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-ride="carousel" data-interval="4500">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>

                <div className="carousel-inner ">
                    <div className="carousel-item active" >
                        <img className="d-block w-100" style={{ maxHeight: "60vh", minHeight: "60vh" }} src="https://bit.ly/2Z2GGdT" alt="Second slide"></img>
                    </div>
                    <div className="carousel-item " >
                        <img className="d-block w-100" style={{ maxHeight: "60vh", minHeight: "60vh" }} src="https://finstream.in/images/slider/1.jpg" alt="First slide"></img>
                    </div>
                    <div className="carousel-item" >
                        <img className="d-block w-100" style={{ maxHeight: "60vh", minHeight: "60vh" }} src="https://bit.ly/3ls3NpG" alt="Third slide"></img>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only"></span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only"></span>
                </a>
            </div>
            <div className="container-fluid bg-light">
                <div className="row">
                    <h2 className="text-center text-white border border-primary bg-primary mb-4 pt-2 pb-2">Recent Blogs</h2>
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
                                <div key={blog._id} className="col-md-5 m-auto p-md-0 ">
                                    <div className="shadow-lg mb-3 bg-white rounded list-group-item list-group-item-action ">
                                        <Link to={`/blog/${blog._id}`} className="flex-column align-items-start" style={{ textDecoration: "none" }}>
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="text-dark pt-3">{blog.title}</h5>
                                            </div>
                                            <p className="trunc text-dark">{blog.content}</p>
                                        </Link>
                                        <Link to={`/profile/${blog.userid}`} style={{ textDecoration: "none" }}>
                                            <small className="text-muted ">By {blog.username}</small>
                                        </Link>
                                        <Link to={`/blog/${blog._id}`}>
                                            <div className="text-center">
                                                <p className="btn btn-outline-dark rounded-circle text-primary">Read More</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="container-fluid bg-light">
                <div className="row">
                    <h2 className="text-center text-white border border-primary bg-primary mt-2 mb-4 pt-2 pb-2">Recent Questions</h2>
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
                                <div key={q._id} className="col-md-5 m-auto p-md-0" >
                                    <div className="shadow-lg mb-3 bg-white rounded list-group-item list-group-item-action ">
                                        <Link key={q._id} to={`/question/${q._id}`} className="flex-column align-items-start" style={{ textDecoration: "none" }}>
                                            <div className="d-flex w-100 justify-content-between">
                                                <h5 className="text-dark pt-3">{q.title}</h5>
                                            </div>
                                            <p className="trunc text-dark">{q.description}</p>
                                        </Link>
                                        <Link to={`/profile/${q.userid}`} style={{ textDecoration: "none" }}>
                                            <small className="text-muted">By {q.username}</small>
                                        </Link>
                                        <Link to={`/question/${q._id}`}>
                                            <div className="text-center">
                                                <p className="btn btn-outline-dark rounded-circle text-primary">Read More</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
}

export default Home
