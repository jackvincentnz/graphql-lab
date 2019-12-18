module.exports = {
    client: {
      excludes: ["**/**/generated/graphql.ts"],
      service: {
        name: "my-graphql-app",
        url: "http://localhost:4000/graphql"
      }
    }
  };