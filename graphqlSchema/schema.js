const Employee = require('../models/studentSchema');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');

const StudentType = new GraphQLObjectType({
    name: 'Student',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lasttName: { type: GraphQLString },
        email: { type: GraphQLString },
        batch: {type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        student: {
            type: StudentType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args){
                return Student.findById(args.id);
            }
        },
        studentlist: {
            type: new GraphQLList(StudentType),
            resolve(parent, args){
                return Student.find();
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addStudent: {
            type: StudentType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                email: { type: GraphQLString },
                mobile: {type: GraphQLString }
            },
            resolve(parent, args){
                let student = new Student({
                    fisrtName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                    mobile: args.mobile
                });
                return student.save();
            }
        },
        deleteStudent: {
            type: StudentType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parent, args){
               return Student.findByIdAndDelete(args.id);
            }
        },
        updateStudent: {
            type: StudentType,
            args: {
                id: { type: GraphQLString },
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lasstName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                mobile: { type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
               return Student.findByIdAndUpdate(args.id, {
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email,
                mobile: args.mobile
               }, {useFindAndModify: false});
            } 
        },
    }
});



module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});