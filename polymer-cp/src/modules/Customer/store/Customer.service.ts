import { controlPanelAPI } from '~/store/service';

const customerAPI = controlPanelAPI.injectEndpoints({
  endpoints: (build) => ({
    addCustomer: build.mutation<ICustomer, FormData>({
      query: (customerData) => ({
        url: '/customer',
        method: 'POST',
        body: customerData,
      }),
      invalidatesTags: ['Customer', 'User'],
    }),
    editCustomer: build.mutation<ICustomer, IEditCustomer>({
      query: (editCustomerData) => ({
        url: `/customer/${editCustomerData.id}`,
        method: 'PUT',
        body: editCustomerData.data,
      }),
      invalidatesTags: ['Customer'],
    }),
    deleteCustomer: build.mutation<IMessage, string>({
      query: (customerId) => ({
        url: `/customer/${customerId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Customer', 'Project', 'User'],
    }),
    getAllCustomers: build.query<ICustomerFull[], string>({
      query: () => ({
        url: '/customer/cp',
        method: 'GET',
      }),
      providesTags: ['Customer'],
    }),
  }),
});

export const {
  useAddCustomerMutation,
  useDeleteCustomerMutation,
  useEditCustomerMutation,
  useGetAllCustomersQuery,
} = customerAPI;
