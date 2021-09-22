import React, { useState, useEffect } from 'react'
import axios from 'axios'

function EditQuestion(props) {
    const [question, setquestion] = useState({ title: "", description: "" })
    const [submitting, setsubmitting] = useState(false)
    useEffect(() => {
        axios.get(`http://localhost:5000/api/question/${props.match.params.id}`)
            .then((res) => {
                setquestion(res.data)
            })
            .catch((err) => console.log(err))

    }, [props.match.params.id])

    const submitQuestion = (e) => {
        e.preventDefault()
        setsubmitting(true)
        const question = {
            title: e.target.title.value,
            description: e.target.description.value
        }
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            question.title = e.target.title.value
            question.description = e.target.description.value
            axios.put(`http://localhost:5000/api/question/${props.match.params.id}`, question, { headers: { "x-access-token": token } })
                .then((res) => {
                    e.target.title.value = ""
                    e.target.description.value = ""
                    setsubmitting(false)
                })
                .catch((err) => console.log(err))
        }
        else {
        }
    }

    return (
        <form className="m-3 m-sm-5 text-center" onSubmit={submitQuestion}>
            <div className="form-floating mb-3">
                <input required defaultValue={question.title} type="text" name="title" className="form-control" id="floatingInput" placeholder="Blog Title"></input>
                <label>Question Title</label>
            </div>
            <div className="form-floating">
                <textarea defaultValue={question.description} required className="form-control h-50" name="description" rows="20" placeholder="Content" id="floatingTextarea"></textarea>
                <label>problem Description</label>
            </div>
            {
                props.isLogedin && !submitting ?
                    <button type="submit" className="btn btn-outline-dark center mt-3">Submit</button>
                    : <button disabled type="submit" className="btn btn-outline-dark center mt-3">Submit</button>
            }

        </form >
    )
}

export default EditQuestion
