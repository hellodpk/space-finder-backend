import { APIGatewayProxyEvent } from 'aws-lambda';
import { handler } from '../../services/SpacesTable/Read';

const event : APIGatewayProxyEvent = {
    queryStringParameters:{
        //spaceId:'bef1f443-0c5a-4f7d-8093-93e46f04e905'
        location:'Oregon'
    }
} as any;

const result=  handler(event, {} as any).then((apiResult)=>{
    const items=JSON.parse(apiResult.body);
    console.log('abc')
});