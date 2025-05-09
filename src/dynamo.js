import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument, DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
    accessKeyId: import.meta.env.VITE_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_ACCESS_SECRET,
    }
});

const dClient = DynamoDBDocumentClient.from(client)

export async function createToDo(item) {
    await dClient.send(new PutCommand({ TableName: "ToDo", Item: item }));
}

export async function scanToDo() {
   const data =  await dClient.send(new ScanCommand({TableName: "ToDo"}))
return data.Items || [];
}