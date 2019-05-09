


const axios = require('axios');
const {GraphQLObjectType,GraphQLList,GraphQLInt,GraphQLString,GraphQLBoolean,GraphQLSchema}=require('graphql');
//launch type
const LaunchType=new GraphQLObjectType({
	name:'Launch',
	fields:()=>({
		flight_number:{type:GraphQLInt},
		mission_name:{type:GraphQLString},
		launch_year:{type:GraphQLInt},
		launch_date_unix:{type:GraphQLInt},
		launch_date_utc:{type:GraphQLInt},
		launch_success:{type:GraphQLString},
		rocket:{type:RocketType}

	})
});
//Rocket
const RocketType=new GraphQLObjectType({
	name:'Rocket',
	fields:()=>({
		rocket_id:{type:GraphQLInt},
		rocket_name:{type:GraphQLString},
		rocket_type:{type:GraphQLString}
	})
});
//route query
const RootQuery = new GraphQLObjectType({
	name:'RootQueryType',
	fields:{
		launches:{
			type:new GraphQLList(LaunchType),
			resolve(parent,args){
              return axios.get('https://api.spacexdata.com/v3/launches').then(res=>res.data);
			}
		},
		launch:{
		type:LaunchType,
		args:{
			flight_number:{type:GraphQLInt}
		},
		resolve(parent,args){
              return axios.get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`).then(res=>res.data);
			}
	}
	}
});
module.exports=new GraphQLSchema({
query:RootQuery
});