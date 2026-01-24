import axios from "axios";
import toast from "react-hot-toast";

export async function createComment(comment, id) {

    try {
        const response = await axios.post("https://linked-posts.routemisr.com/comments",
            {
                content: comment,
                post: id
            },
            {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            }
        )
        toast.success("comment created successfully")
        return response

    } catch (error) {
        console.log(error);
        toast.error("something went wrong . please try again")

    }
}

export async function deleteComment(id) {
    try {
        const { data } = await axios.delete(`https://linked-posts.routemisr.com/comments/${id}`, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
        toast.success("comment deleted successfully")

    } catch (error) {
        console.log(error);
        toast.error("something went wrong . please try again")

    }
}

export async function editComment(id, content) {
    try {
        const { data } = await axios.put(`https://linked-posts.routemisr.com/comments/${id}`, {
            content: content
        }, {
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
        toast.success("comment edited successfully")
        return data

    } catch (error) {
        console.log(error);
        toast.error("something went wrong . please try again")

    }
}