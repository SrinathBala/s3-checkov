import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class S3CheckovStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, `S3-checkov-15-07-23`, {
      publicReadAccess: true,
      bucketName: `s3-checkov-15-07-23`,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        ignorePublicAcls: false,
        blockPublicPolicy: false,
        restrictPublicBuckets: false
      })
    });

    const cfnBucket = bucket.node.defaultChild as s3.CfnBucket;

    cfnBucket.cfnOptions.metadata = {
      'checkov': {
        'skip': [
          {
            'id': 'CKV_AWS_18',
            'comment': 'No need to ensure the S3 bucket has access logging enabled'
          }
        ]
      }
    }
  }
}
