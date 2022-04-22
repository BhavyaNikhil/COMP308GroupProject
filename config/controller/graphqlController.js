const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    
  type Query { 
    alert(alertId: Int!): Alert
    alerts: [Alert],
  }
  type Mutation {
      create(owner: String!, patientName: String!, message: String!, created: String!, unread: String!): Alert,
      deleteAlert(alertId: Int!): DeleteAlertResponse
  }
  input AlertInput {
    owner: String!, patientName: String!, message: String!, created: String!, unread: String!
  }
  type DeleteAlertResponse {
    alertId: Int!
  }
  type Alert {
    alertId: Int!,owner: String!, patientName: String!, message: String!, created: String!, unread: String!
  }
  type Query { 
    alert(alertId: Int!): Alert
    alerts: [Alert],
  }
  type Mutation {
      create(owner: String!, patientName: String!, message: String!, created: String!, unread: String!): Alert,
      deleteAlert(alertId: Int!): DeleteAlertResponse
  }
  input AlertInput {
    owner: String!, patientName: String!, message: String!, created: String!, unread: String!
  }
  type DeleteAlertResponse {
    alertId: Int!
  }
  type Alert {
    alertId: Int!,owner: String!, patientName: String!, message: String!, created: String!, unread: String!
  }
  type Query { 
    alert(alertId: Int!): Alert
    alerts: [Alert],
  }
  type Mutation {
      create(owner: String!, patientName: String!, message: String!, created: String!, unread: String!): Alert,
      deleteAlert(alertId: Int!): DeleteAlertResponse
  }
  input AlertInput {
    owner: String!, patientName: String!, message: String!, created: String!, unread: String!
  }
  type DeleteAlertResponse {
    alertId: Int!
  }
  type Alert {
    alertId: Int!,owner: String!, patientName: String!, message: String!, created: String!, unread: String!
  }
`);