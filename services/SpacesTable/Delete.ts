import { DynamoDB} from 'aws-sdk';
import {APIGatewayProxyEvent, Context, APIGatewayProxyResult} from 'aws-lambda';


const TABLE_NAME=process.env.TABLE_NAME;
const PRIMARY_KEY=process.env.PRIMARY_KEY as string;
const dbClient=new DynamoDB.DocumentClient();

async function handler(event: APIGatewayProxyEvent,context:Context):Promise<APIGatewayProxyResult>{
    const result: APIGatewayProxyResult={
        statusCode:200,
        body:'Hello from DynamoDB'
    }

    

    try{
        const spaceID=event.queryStringParameters?.[PRIMARY_KEY];
        if(spaceID){
            const deleteResult= await dbClient.delete({
                TableName:TABLE_NAME!,
                Key:{
                    [PRIMARY_KEY]:spaceID
                },
            }).promise();
            result.body=JSON.stringify(deleteResult);
        }
    }catch(error){
        result.body="error"
    }


    return result
}
export {handler}