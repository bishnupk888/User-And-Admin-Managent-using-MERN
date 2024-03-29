import User from '../../models/userModel.js'

const fetchUser = async()=>{
    try {
        const users = await User.find({},{name:1,email:1})
        return users
    } catch (error) {
        throw new Error("error fetching user", error)
    }
}

const deleteUser  = async(userId)=>{
    try{
    const deletedUser = await User.findByIdAndDelete(userId)
    if(!deletedUser){
        return {success :false, message : "user not found"}
    }
    else{
        return {success : true, message: "successfully deleted user:"}
    }
}catch(error){
    throw new Error("Error deleting user",error)
}
}

const updateUser = async (userData)=>{
    try {
        const user = await User.findById(userData.userId)
        if(!user){
            return {success : false, message :"user not found" }
        }
        user.name = userData.name
        user.email = userData.email

        await user.save()
        return {success: true, message : "user updated successfully"}
    } catch (error) {

        throw new Error("Failed updating user",error)
        
    }
}

export {fetchUser,updateUser,deleteUser}