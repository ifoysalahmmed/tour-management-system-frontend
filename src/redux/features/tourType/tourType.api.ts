import { baseApi } from "@/redux/baseApi";
import type { ITourTypeRequest, ITourTypeResponse, Root, TMeta } from "@/types";

export const tourTypeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTourType: builder.mutation<Root<ITourTypeResponse>, ITourTypeRequest>(
      {
        query: (payload) => ({
          url: "/tour-types/create",
          method: "POST",
          data: payload,
        }),
        invalidatesTags: ["TOUR_TYPE"],
      },
    ),
    getAllTourTypes: builder.query<
      { data: ITourTypeResponse[]; meta?: TMeta },
      void
    >({
      query: () => ({
        url: "/tour-types",
        method: "GET",
      }),
      transformResponse: (response: Root<ITourTypeResponse[]>) => ({
        data: response.data || [],
        meta: response.meta,
      }),
      providesTags: ["TOUR_TYPE"],
    }),
    deleteTourType: builder.mutation<Root<null>, string>({
      query: (id) => ({
        url: `/tour-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TOUR_TYPE"],
    }),
  }),
});

export const {
  useCreateTourTypeMutation,
  useGetAllTourTypesQuery,
  useDeleteTourTypeMutation,
} = tourTypeApi;
