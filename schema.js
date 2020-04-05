const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
} = require('graphql');

// Test Data
// const customers = [
//   { id: '1', name: 'John Doe', email: 'jdoe@gmail.com', age: 35 },
//   { id: '2', name: 'Dave Doe', email: 'ddoe@gmail.com', age: 44 },
//   { id: '3', name: 'Simon Doe', email: 'sdoe@gmail.com', age: 66 },
// ];

// Customer Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
    createdTime: { type: GraphQLFloat },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
      },
      async resolve(parentValue, args) {
        // for (let i = 0; i < customers.length; i++) {
        //   if (customers[i].id === args.id) {
        //     return customers[i];
        //   }
        // }
        const res = await axios.get(
          'http://localhost:3000/customers/' + args.id
        );
        return res;
      },
    },
    customerList: {
      type: new GraphQLList(CustomerType),
      async resolve(parentValue, args) {
        // return customers;

        const res = await axios.get('http://localhost:3000/customers/');
        return res.data;
      },
    },
  },
});

// Mutation
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parentValue, args) {
        const resp = await axios.post('http://localhost:3000/customers', {
          name: args.name,
          email: args.email,
          age: args.age,
          createdTime: Date.now(),
        });
        return resp.data;
      },
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parentValue, args) {
        const resp = await axios.delete(
          'http://localhost:3000/customers/' + args.id
        );
        return resp.data;
      },
    },
    editCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parentValue, args) {
        const resp = await axios.patch(
          'http://localhost:3000/customers/' + args.id,
          args
        );
        return resp.data;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
