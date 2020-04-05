# GraphQL Server Template

### Libraries

- Express
- Express Graph QL
- Nodemon
- Axios
- Json Server

### Commands

- npm run dev:server
- npm run json:server

### Development Servers

- http://localhost:4000/graphql
- http://localhost:3000

### Query Example

<pre>
{
    customer(id: "1"){
        name,
        email,
        age
    }
}
</pre>
<pre>
{
  customerList{
    age
    name
  }
}
</pre>
<pre>
mutation{
  addCustomer(name:"Harry Dude", email:"HarryPotter@pot.com",age:22){
    id,
    name,
    email
  }
}
</pre>
<pre>
mutation{
  deleteCustomer(id:"VGk5e2t"){
    id
  }
}
</pre>
