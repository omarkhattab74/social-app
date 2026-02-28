import axios from "axios";
import { createContext } from "react";

export let Postscontext = createContext()

export function Postscontextprovider(props) {

    async function getPosts() {
        try {
            let response = await axios.get("https://route-posts.routemisr.com/posts", {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            })
            return response


        } catch (error) {
            return error

        }



    }

    return <Postscontext.Provider value={getPosts}>
        {props.children}
    </Postscontext.Provider>
}
