/* global process */

import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const s3 = new S3Client({});
const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const PHOTO_BUCKET = process.env.PHOTO_BUCKET;
const PHOTOS_TABLE = process.env.PHOTOS_TABLE;

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "DELETE,OPTIONS",
};

function response(statusCode, body) {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(body),
  };
}

function getPhotoID(event) {
  return (
    event.pathParameters?.photoID ||
    event.pathParameters?.id ||
    event.queryStringParameters?.photoID
  );
}

export async function handler(event) {
  if (event.requestContext?.http?.method === "OPTIONS" || event.httpMethod === "OPTIONS") {
    return response(204, {});
  }

  if (!PHOTO_BUCKET || !PHOTOS_TABLE) {
    return response(500, { message: "Delete API is missing PHOTO_BUCKET or PHOTOS_TABLE." });
  }

  const photoID = getPhotoID(event);

  if (!photoID) {
    return response(400, { message: "photoID is required." });
  }

  const existingPhoto = await dynamo.send(
    new GetCommand({
      TableName: PHOTOS_TABLE,
      Key: { photoID },
    })
  );

  if (!existingPhoto.Item) {
    return response(404, { message: "Photo not found." });
  }

  const objectKey = existingPhoto.Item.s3Key || existingPhoto.Item.filename;

  if (!objectKey) {
    return response(500, { message: "Photo record does not include an S3 key or filename." });
  }

  await s3.send(
    new DeleteObjectCommand({
      Bucket: PHOTO_BUCKET,
      Key: objectKey,
    })
  );

  await dynamo.send(
    new DeleteCommand({
      TableName: PHOTOS_TABLE,
      Key: { photoID },
    })
  );

  return response(200, { message: "Photo deleted.", photoID });
}
