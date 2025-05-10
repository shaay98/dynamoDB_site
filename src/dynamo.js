import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient, PutCommand, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
    region: import.meta.env.VITE_AWS_REGION,
    credentials: {
    accessKeyId: import.meta.env.VITE_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_ACCESS_SECRET,
    }
});

const dClient = DynamoDBDocumentClient.from(client)


export async function createToDo(todo) {
    await dClient.send(new PutCommand({ TableName: "ToDo", Item: todo}));
}
export async function deleteTodo(id) {
    await dClient.send(new DeleteCommand ({ TableName: "ToDo", Key: { id }}));
}

export async function scanToDo() {
   const data =  await dClient.send(new ScanCommand({TableName: "ToDo"}))
return data.Items || [];
}

export async function toggleDone(id, completed) {
await dClient.send(
    new UpdateCommand({
        TableName : "ToDo",
        Key : {id},
        UpdateExpression: "SET #done = :val",
        ExpressionAttributeNames: {"#done": "completed"},
        ExpressionAttributeValues:{ ":val": completed },
    }),
);    
}