import { Bucket } from '../models/Bucket.js';

export class BucketController {
    constructor() {
        this.buckets = [];
    }

    createBucket() {
        this.buckets.push(new Bucket());
    }
}