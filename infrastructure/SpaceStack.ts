import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Code, Function as LambdaFunction, Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import {LambdaIntegration, RestApi} from 'aws-cdk-lib/aws-apigateway'
import { GenericTable } from './GenericTable';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { PrimaryKey } from 'aws-cdk-lib/aws-appsync';

export class SpaceStack extends Stack{

    private api= new RestApi(this,'SpaceApi');


    private spacesTable=new GenericTable(this,{
         tableName:'SpacesTable',
         primaryKey:'spaceId',
         createLambdaPath:'Create',
         readLambdaPath:'Read',
         updateLambdaPath:'Update',
         deleteLambdaPath:'Delete',
         secondaryIndexes:['location']
         }
        )

    constructor(scope: Construct,id: string, props: StackProps){
        super(scope, id, props)

        const helloLambdaNodeJs=new NodejsFunction(this,'helloLambdaNodeJs',{
            entry:(join(__dirname,'..','services','node-lambda','hello.ts')),
            handler:'handler'
        })
        const s3ListPolicy=new PolicyStatement();
        s3ListPolicy.addActions('s3:ListAllMyBuckets');
        s3ListPolicy.addResources('*');
        helloLambdaNodeJs.addToRolePolicy(s3ListPolicy);

            //hello Api lambda integration
            const helloLambdaIntegration=new LambdaIntegration(helloLambdaNodeJs)
            const helloLambdaResource=this.api.root.addResource('hello');
            helloLambdaResource.addMethod('Get',helloLambdaIntegration);

            //Spaces API integration
            const spaceResourse=this.api.root.addResource('spaces');
            spaceResourse.addMethod('POST',this.spacesTable.createLambdaIntegration);
            spaceResourse.addMethod('GET',this.spacesTable.readLambdaIntegration);
            spaceResourse.addMethod('PUT',this.spacesTable.updateLambdaIntegration);
            spaceResourse.addMethod('DELETE',this.spacesTable.deleteLambdaIntegration);
    }

}