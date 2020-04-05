# GraphQL Server Template

### Key Technologies

- Express
- Express Graph QL
- Nodemon

### Commands

- npm run dev:server

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
