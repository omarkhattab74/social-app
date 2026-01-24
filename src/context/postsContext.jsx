import axios from "axios";
import { createContext } from "react";

export let Postscontext = createContext()

export function Postscontextprovider(props) {

    async function getPosts() {
        try {
            let response = await axios.get("https://linked-posts.routemisr.com/posts?limit=50&sort=-createdAt", {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            })
            // console.log(response.data.posts);
            return response.data.posts


        } catch (error) {
            // console.log(error);
            return error

        }



    }

    return <Postscontext.Provider value={getPosts}>
        {props.children}
    </Postscontext.Provider>
}
