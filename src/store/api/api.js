import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/constants';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    tagTypes:['Project'],
    endpoints:(builder)=>({
        getAllProject: builder.query({
            query:({search = '', selected = ''})=>{
                return `project?searchQuery=${search}&sort=${selected}`},
            providesTags:(result)=>
            result
            ?   [
                ...result.map(project=> ({type: 'Project', id: project._id})),
                {type: 'Project', id: 'LIST-PROJECT'},
                {type: 'Project', id: 'PARTIAL-PROJECT'},
            ]
        :   [
                {type: 'Project', id: 'LIST-PROJECT'},
                {type: 'Project', id: 'PARTIAL-PROJECT'},
            ],
        }),
        getAllProjectUser: builder.query({
            query:(id)=>{
                return `/project/user/${id}`
            },
            providesTags:(result)=>
            result
            ?   [
                ...result.map(project=> ({type: 'Project', id: project._id})),
                {type: 'Project', id: 'LIST-PROJECT'},
                {type: 'Project', id: 'PARTIAL-PROJECT'},
            ]
        :   [
                {type: 'Project', id: 'LIST-PROJECT'},
                {type: 'Project', id: 'PARTIAL-PROJECT'},
            ],

        }),
        createProject: builder.mutation({
            query: proj=>({
                body: proj,
                url: '/project',
                method:'POST'
            }),
            invalidatesTags:[{type: 'Project', id: 'LIST-PROJECT'}],
        }),
        getProject: builder.query({
            query:({id}) => `/project/${id}`,
            providesTags:(result, error, id) => [{type:'Project', id}]
        }), 
        updateProject:builder.mutation({
            query:({id, formData})=>({
                url:`/project/${id}`,
                method:'PUT',
                body: formData,
            }),
            invalidatesTags:(result, error, arg)=>[{type: 'Project', id: arg._id}]
        }),
        deleteProject:builder.mutation({
            query: (id)=>({
                url: `/project/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags:[{type: 'Project', id: 'PARTIAL-PROJECT'}]
        })
    })
})

export const {
    useGetProjectQuery,
    useGetAllProjectQuery,
    useGetAllProjectUserQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation
} = api;