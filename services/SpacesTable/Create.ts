import { DynamoDB} from 'aws-sdk';
import {APIGatewayProxyEvent, Context, APIGatewayProxyResult} from 'aws-lambda'
import { v4 } from 'uuid';


const dbClient=new DynamoDB.DocumentClient();

async function handler(event: APIGatewayProxyEvent,context:Context):Promise<APIGatewayProxyResult>{
    const result: APIGatewayProxyResult={
        statusCode:200,
        body:'Hello from DynamoDB'
    }

    const item={
        spaceId:v4()
    }

    try{
        await dbClient.put({
            TableName:'SpacesTable',
            Item:item
        }).promise()
    } catch (error){
        result.body="error"
    }

    return result
}
export {handler}