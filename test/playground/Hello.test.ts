import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../services/SpacesTable/Update';

const event : APIGatewayProxyEvent = {
    queryStringParameters:{
        spaceId:'3f13230f-68eb-4ef8-9cba-0ae065686c88'
    },
    body:{
        location:'new location'
    }
} as any;

const result=  handler(event, {} as any).then((apiResult)=>{
    const items=JSON.parse(apiResult.body);
    console.log('abc')
});