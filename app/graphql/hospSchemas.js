var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var StudentModel = require('../models/Student');
var CourseModel = require('../models/Course');

var studentType = new GraphQLObjectType({
    name: 'nurse',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
        firstName: {
          type: GraphQLString
        },
        lastName: {
          type: GraphQLString
        },
        username: {
          type: GraphQLString
        },
        updated_date: {
          type: GraphQLDate
        }
      }
    }
  });
  
  var patientType = new GraphQLObjectType({
    name: 'patient',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
        firstName: {
          type: GraphQLString
        },
        lastName: {
          type: GraphQLString
        },
        username: {
          type: GraphQLString
        },
        updated_date: {
          type: GraphQLDate
        }
      }
    }
  });

  var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        nurses: {
          type: new GraphQLList(nurseType),
          resolve: function () {
            const nurses = NurseModel.find().exec()
            if (!nurses) {
              throw new Error('Error')
            }
            return nurses
          }
        },
        nurse: {
          type: nurseType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const nurseDetails = NurseModel.findById(params.id).exec()
            if (!nurseDetails) {
              throw new Error('Error')
            }
            return nurseDetails
          }
        },
		patients: {
          type: new GraphQLList(patientType),
          resolve: function () {
            const patients = PatientModel.find().exec()
            if (!patients) {
              throw new Error('Error')
            }
            return patients
          }
        },
        patient: {
          type: patientType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const patientDetails = PatientModel.findById(params.id).exec()
            if (!patientDetails) {
              throw new Error('Error')
            }
            return patientsDetails
          }
        }
      }
    }
  });

  var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
      return {
        addNurse: {
          type: nurseType,
          args: {
            password: {
              type: new GraphQLNonNull(GraphQLString)
            },
            firstName: {
              type: new GraphQLNonNull(GraphQLString)
            },
            lastName: {
              type: new GraphQLNonNull(GraphQLString)
            },
            username: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: function (root, params) {
            const nurseModel = new NurseModel(params);
            const newNurse = nurseModel.save();
            if (!newNurse) {
              throw new Error('Error');
            }
            return newNurse
          }
        },
        updateNurse: {
          type: nurseType,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString)
            },
            password: {
              type: new GraphQLNonNull(GraphQLString)
            },
            firstName: {
              type: new GraphQLNonNull(GraphQLString)
            },
            lastName: {
              type: new GraphQLNonNull(GraphQLString)
            },
            username: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            return NurseModel.findByIdAndUpdate(params.id, { password: params.password, firstName: params.firstName, lastName: params.lastName, username: params.username, updated_date: new Date() }, function (err) {
              if (err) return next(err);
            });
          }
        },
        removeNurse: {
          type: nurseType,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            const remNurse = NurseModel.findByIdAndRemove(params.id).exec();
            if (!remNurse) {
              throw new Error('Error')
            }
            return remNurse;
          }
        },
		createPatient: {
          type: patientType,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString)
            },
            password: {
              type: new GraphQLNonNull(GraphQLString)
            },
            firstName: {
              type: new GraphQLNonNull(GraphQLString)
            },
            lastName: {
              type: new GraphQLNonNull(GraphQLString)
            },
            username: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve: function (root, params) {
            const patientModel = new PatientModel(params);
            const newPatient = patientModel.save();
            if (!newPatient) {
              throw new Error('Error');
            }
            return newPatient
          }
        },
        updatePatient: {
          type: patientType,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString)
            },
            password: {
              type: new GraphQLNonNull(GraphQLString)
            },
            firstName: {
              type: new GraphQLNonNull(GraphQLString)
            },
            lastName: {
              type: new GraphQLNonNull(GraphQLString)
            },
            username: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            return PatientModel.findByIdAndUpdate(params.id, { password: params.password, firstName: params.firstName, lastName: params.lastName, username: params.username, updated_date: new Date() }, function (err) {
              if (err) return next(err);
            });
          }
        },
        removePatient: {
          type: patientType,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            const remPatient = PatientModel.findByIdAndRemove(params.id).exec();
            if (!remPatient) {
              throw new Error('Error')
            }
            return remPatient;
          }
        }
      }
    }
  });

  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});