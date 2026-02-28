import axios from "axios";

export async function signUp(data){
    
    try{
        const response = await axios.post('https://route-posts.routemisr.com/users/signup', data)
    // console.log(data.message);
    return response.data;
        // console.log(response);
        
    }catch(error){
        // console.log(error.response.data.error);
        return error.response.data
        // console.log(error.response);
        
        
    }
    
}

 export async function login(loginData) {
    try {
         const response= await axios.post("https://route-posts.routemisr.com/users/signin",loginData)
//    console.log(response.data.message);
   return response.data
    } catch (error) {
        // console.log(error.response.data.error);
        return error.response.data
        
    }
  
   
}