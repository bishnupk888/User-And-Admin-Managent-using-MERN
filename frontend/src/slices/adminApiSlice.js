import { apiSlice } from "./apiSlice";


const ADMIN_URL = '/api/admin'

export const adminApiSlice = apiSlice.injectEndpoints({
    
    endpoints: (builder) => ({
        
        adminLogin: builder.mutation({
            
            query: (data) => ({
                url: `${ADMIN_URL}/auth`,
                method: 'POST',
                body: data
            })

        }),
        adminLogout: builder.mutation({
            
            query: () => ({
                url: `${ADMIN_URL}/logout`,
                method: 'POST'
            })

        }),
        adminRegister: builder.mutation({
            
            query: (data) => ({
                url: `${ADMIN_URL}/register`,
                method: 'POST',
                body: data
            })

        }),
        updateAdmin: builder.mutation({
            
            query: (data) => ({
                url: `${ADMIN_URL}/profile`,
                method: 'PUT',
                body: data
            })

        }),
        getUsersData: builder.mutation({
            
            query: () => ({
                url: `${ADMIN_URL}/get-users`,
                method: 'GET'
            })

        }),
        deleteUser: builder.mutation({
            
            query: (data) => ({
                url: `${ADMIN_URL}/delete-user`,
                method: 'POST',
                body: data
            })

        }),
        updateUserByAdmin: builder.mutation({
            
            query: (data) => ({
                url: `${ADMIN_URL}/update-user`,
                method: 'PUT',
                body: data
            })

        })

    })

})


export const {

    useAdminLoginMutation,
    useAdminLogoutMutation,
    useAdminRegisterMutation,
    useUpdateAdminMutation,
    useGetUsersDataMutation,
    useDeleteUserMutation,
    useUpdateUserByAdminMutation

} = adminApiSlice;