import {api} from './api';

export const taskApi = api.injectEndpoints({
    endpoints:(builder)=>({
        createTask: builder.mutation({
            query: task=>({
                body:task,
                url: '/task',
                method: 'POST',
            }),
            invalidatesTags:(result, error, arg)=>[{type: 'Project', id: arg.project}]
        }),
        deleteTask:builder.mutation({
            query:(id)=>({
                url: `/task/${id}`,
                method: 'DELETE',                
            }),
            invalidatesTags:[{type: 'Project', id: 'PARTIAL-PROJECT'}]
        }),
        updateTask:builder.mutation({
            query:({id, formData})=>({
                url:`/task/${id}`,
                method:'PUT',
                body: formData,
            }),
            invalidatesTags:(result, error, arg)=>[{type: 'Project', id: arg.project}]
        }),
        getTask: builder.query({
            query:({id}) => `/task/${id}`
        })
    })
})

export const {
    useGetTaskQuery,
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useUpdateTaskMutation
} = taskApi;