import React, { useState, useEffect } from 'react'
import axios from 'axios'
export default function EditProfile(props) {
    const [user, setuser] = useState({})
    const [submitting, setsubmitting] = useState(false)
    const [profile, setprofile] = useState({})
    useEffect(() => {
        window.scrollTo(0, 0)
        if (props.isLogedin) {
            const user = JSON.parse(localStorage.getItem('user'))
            setuser(user)
        }
        else {
            setuser("")
        }
    }, [props.isLogedin])

    useEffect(() => {

        const token = JSON.parse(localStorage.getItem('token'))
        axios.get(`https://pordocs.herokuapp.com/api/user/${props.match.params.id}`, { headers: { "x-access-token": token } })
            .then((res) => {
                setprofile(res.data)
            })
            .catch((err) => console.log(err))
    }, [props.match.params.id])

    const submitProfile = (e) => {
        e.preventDefault()
        setsubmitting(true)
        const profile = {
            phoneno: e.target.phoneno.value,
            linkedin: e.target.linkedin.value,
            facebook: e.target.facebook.value,
            showDetails: e.target.showDetails.checked
        }
        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.put(`https://pordocs.herokuapp.com/api/user/edit/${props.match.params.id}`, profile, { headers: { "x-access-token": token } })
                .then((res) => {
                    e.target.phoneno.value = ""
                    e.target.linkedin.value = ""
                    e.target.facebook.value = ""
                    props.history.push(`/profile/${props.match.params.id}`)
                    setsubmitting(false)
                })
                .catch((err) => console.log(err))
        }
        else {
        }
    }

    return (
        <div className="container-fluid">
            <form className="m-3 m-sm-5 text-center" onSubmit={submitProfile}>
                <div className="form-floating mb-3">
                    <input defaultValue={profile.phoneno} type="number" name="phoneno" minLength="10" maxLength="10" className="form-control" id="floatingInput" placeholder="Phone no"></input>
                    <label>Phone no. (optional)</label>
                </div>
                <div className="form-floating mb-3">
                    <input defaultValue={profile.linkedin} type="text" name="linkedin" className="form-control" id="floatingInput" placeholder="Linkedin url"></input>
                    <label>Linkedin url (optional)</label>
                </div>
                <div className="form-floating mb-3">
                    <input defaultValue={profile.facebook} type="text" name="facebook" className="form-control" id="floatingInput" placeholder="Facebook url"></input>
                    <label>Facebook url (optional)</label>
                </div>
                <div>
                    <input className="me-2" type="checkbox" name="showDetails" value="true"></input>
                    <label htmlFor="showDetails">Make Your contact Details vaisible to other users</label>
                </div>
                {
                    props.isLogedin && user._id === profile._id && !submitting ?
                        <button type="submit" className="btn btn-outline-dark center mt-3">Submit</button>
                        : <button disabled type="submit" className="btn btn-outline-dark center mt-3">Submit</button>
                }

            </form >
        </div>
    )
}
