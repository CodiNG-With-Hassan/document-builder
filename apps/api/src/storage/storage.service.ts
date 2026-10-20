import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
  type S3ClientConfig,
} from '@aws-sdk/client-s3';

@Injectable()
export class StorageService {
  readonly client: S3Client;

  constructor(private readonly config: ConfigService) {
    const endpoint = `${this.useSsl() ? 'https' : 'http'}://${config.get<string>(
      'MINIO_ENDPOINT',
    )}:${config.get<string>('MINIO_PORT') ?? 9000}`;

    const options: S3ClientConfig = {
      endpoint,
      region: 'us-east-1',
      forcePathStyle: true,
      credentials: {
        accessKeyId: config.get<string>('MINIO_ACCESS_KEY') ?? '',
        secretAccessKey: config.get<string>('MINIO_SECRET_KEY') ?? '',
      },
    };

    this.client = new S3Client(options);
  }

  put(
    bucket: string,
    key: string,
    body: Buffer | string,
    contentType?: string,
  ) {
    return this.client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );
  }

  get(bucket: string, key: string) {
    return this.client.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
  }

  private useSsl() {
    return this.config.get<string>('MINIO_USE_SSL') === 'true';
  }
}
