import React, { useEffect, useState } from 'react'
import axios from 'axios'

function AskQuestion(props) {
    const [status, setstatus] = useState("You are not Logged In, Log In to Ask a Question")
    const [submitting, setsubmitting] = useState(false)

    useEffect(() => {
        if (props.isLogedin)
            setstatus("")
        else
            setstatus("You are not Logged In, Log In to Ask a Question")
    }, [props.isLogedin])

    const submitQuestion = (e) => {
        setsubmitting(true)
        e.preventDefault()
        const question = {
            title: e.target.title.value,
            description: e.target.description.value
        }
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.post("http://localhost:5000/api/question/", question, { headers: { "x-access-token": token } })
                .then((res) => {
                    e.target.title.value = ""
                    e.target.description.value = ""
                    setstatus("You Question has been Successfully Submitted")
                    setsubmitting(false)
                })
                .catch((err) => console.log(err))
        }
        else {
        }
    }

    return (
        <form className="m-3 m-sm-5 text-center" onSubmit={submitQuestion}>
            {
                status.length > 0 ?
                    <div className="alert alert-primary" role="alert">
                        {status}
                    </div> : null
            }
            <div className="form-floating mb-3 border border-primary">
                <input required type="text" name="title" className="form-control" id="floatingInput" placeholder="Blog Title"></input>
                <label>Question Title</label>
            </div>
            <div className="form-floating border border-primary">
                <textarea required className="form-control h-50" name="description" rows="20" placeholder="Content" id="floatingTextarea"></textarea>
                <label>Problem Description</label>
            </div>
            {
                props.isLogedin && !submitting ?
                    <button type="submit" className="btn btn-outline-primary  center mt-3">Submit</button>
                    : <button disabled type="submit" className="btn btn-outline-primary center mt-3">Submit</button>
            }

        </form >
    )
}

export default AskQuestion
