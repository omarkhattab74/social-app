import axios from "axios";
import toast from "react-hot-toast";



export async function getPostComments( id) {
   
    try {
        const response = await axios.get(`https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10`,
           
            {
                headers: {
                    token: localStorage.getItem("userToken")
                }
            }
        )
        // console.log(response.data);
        
        return response.data

    } catch (error) {
        console.log(error);

    }
}


export async function createComment(formdata, id) {
   
    try {
        const response = await axios.post(`https://route-posts.routemisr.com/posts/${id}/comments`,
            formdata,
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

export async function deleteComment(id , postId) {
    try {
        const { data } = await axios.delete(`https://route-posts.routemisr.com/posts/${postId}/comments/${id}`, {
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

export async function editComment(id, content, postId) {
    try {
        const { data } = await axios.put(`https://route-posts.routemisr.com/posts/${postId}/comments/${id}`, 
            content
        , {
            headers: {
                token: localStorage.getItem("userToken")
            }
        })
        console.log(data);
        
        toast.success("comment edited successfully")
        return data

    } catch (error) {
        console.log(error);
        toast.error("something went wrong . please try again")

    }
}