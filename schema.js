const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
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
        return res.data;
      },
    },
    customerList: {
      type: new GraphQLList(CustomerType),
      async resolve(parentValue, args) {
        // return customers;

        const res = await axios.get('http://localhost:3000/customers/');
        return res;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
