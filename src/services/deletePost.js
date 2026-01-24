import axios from "axios";
import toast from "react-hot-toast";

export async function deletePost(id) {
    try {
        const { data } = await axios.delete(`https://linked-posts.routemisr.com/posts/${id}`,
            {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            }
        )
        toast.success("post deleted Successfully")
        return data


    } catch (error) {
        console.log(error);
        toast.error("something went wrong . please try again")

    }
}