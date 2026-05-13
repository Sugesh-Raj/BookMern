import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseUrl';

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/books`,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery,
  tagTypes: ['Books'],
  endpoints: (builder) => ({

    // GET all books
    fetchAllBooks: builder.query({
      query: () => '/',
      providesTags: ['Books']
    }),

    // GET single book
    fetchBookById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Books', id }]
    }),

    // ADD book
    addBook: builder.mutation({
      query: (newBook) => ({
        url: '/create-book',
        method: 'POST',
        body: newBook
      }),
      invalidatesTags: ['Books']
    }),

    // UPDATE book
    updateBook: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/edit/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Books']
    }),

    // DELETE book
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Books']
    })

  })
});

export const {
  useFetchAllBooksQuery,
  useFetchBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation
} = booksApi;

export default booksApi;
