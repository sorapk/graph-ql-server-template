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

### Query Example

<pre>
http://localhost:4000/graphql
</pre>
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
