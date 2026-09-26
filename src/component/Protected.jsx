import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {auth} from "../firebase.js"
import { onAuthStateChanged } from "firebase/auth"
export default function Protected(props) {
    const { Page } = props
    const Login = useNavigate()
    useEffect(() => {
        onAuthStateChanged(auth, (current_user) => {
            // console.log(current_user)
            if (!current_user) {
                Login('/login')
            }

        })
    }, [])
    return(
        <div>
            <Page />
        </div>
    )
}