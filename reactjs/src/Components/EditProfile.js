import React, { useState, useEffect } from 'react'
import axios from 'axios'
export default function EditProfile(props) {
    const [user, setuser] = useState({})
    const [submitting, setsubmitting] = useState(false)
    const [profile, setprofile] = useState({})
    const [msg, setmsg] = useState("")
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
        setmsg("")
        if (e.target.pic.files[0].size > 160000) {
            setmsg("Image size should be less than 150kb")
            return;
        }
        setsubmitting(true)
        const profile = new FormData();
        profile.append("pic", e.target.pic.files[0])
        profile.append("phoneno", e.target.phoneno.value)
        profile.append("linkedin", e.target.linkedin.value)
        profile.append("facebook", e.target.facebook.value)
        profile.append("instagram", e.target.instagram.value)
        profile.append("twitter", e.target.twitter.value)
        profile.append("youtube", e.target.youtube.value)
        profile.append("other", e.target.other.value)
        profile.append("showDetails", e.target.showDetails.checked)

        const token = JSON.parse(localStorage.getItem('token'))
        if (token) {
            axios.put(`https://pordocs.herokuapp.com/api/user/edit/${props.match.params.id}`, profile, { headers: { "x-access-token": token } })
                .then((res) => {
                    e.target.pic.files = []
                    e.target.phoneno.value = ""
                    e.target.linkedin.value = ""
                    e.target.facebook.value = ""
                    e.target.instagram.value = ""
                    e.target.twitter.value = ""
                    e.target.youtube.value = ""
                    e.target.other.value = ""
                    setsubmitting(false)
                })
                .catch((err) => console.log(err))
        }
        else {
        }
        props.history.push(`/profile/${props.match.params.id}`)
    }

    return (
        <div className="container-fluid">
            <form className="m-3 m-sm-5 text-center" encType="multipart/form-data" onSubmit={submitProfile}>
                <div className="form mb-3">
                    <label>Photo.(optional) {msg}</label>
                    <input defaultValue={profile.pic} type="file" accept="image/png,image/jpg,image/jpeg" name="pic" className="form-control" id="floatingInput" ></input>
                </div>
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

                <div className="form-floating mb-3">
                    <input defaultValue={profile.instagram} type="text" name="instagram" className="form-control" id="floatingInput" placeholder="Instagram url"></input>
                    <label>Instagram url (optional)</label>
                </div>

                <div className="form-floating mb-3">
                    <input defaultValue={profile.twitter} type="text" name="twitter" className="form-control" id="floatingInput" placeholder="Twitter url"></input>
                    <label>Twitter url (optional)</label>
                </div>
                <div className="form-floating mb-3">
                    <input defaultValue={profile.youtube} type="text" name="youtube" className="form-control" id="floatingInput" placeholder="Youtube url"></input>
                    <label>Youtube url (optional)</label>
                </div>
                <div className="form-floating mb-3">
                    <input defaultValue={profile.other} type="text" name="other" className="form-control" id="floatingInput" placeholder="Any Other url"></input>
                    <label>Any Other url (optional)</label>
                </div>
                <div>
                    <input className="me-2" type="checkbox" name="showDetails" value="true"></input>
                    <label htmlFor="showDetails">Make Your contact Details visible to other users</label>
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
