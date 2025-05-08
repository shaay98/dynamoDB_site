import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument, DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
    accessKey: import.meta.env.VITE_ACCESS_KEY,
    accessSecret: import.meta.env.VITE_ACCESS_SECRET,
    }
});

const dClient = DynamoDBDocumentClient.from(client)

export async function scanToDo(item) {
    await dClient.send(new PutCommand({ TableName: "ToDo", Item: item }));
}