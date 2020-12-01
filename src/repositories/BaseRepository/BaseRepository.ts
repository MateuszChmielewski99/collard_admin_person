import * as dotenv from 'dotenv';
import {
  MongoClient,
  FilterQuery,
  CollectionAggregationOptions,
} from 'mongodb';

export class BaseRepository<T extends { _id?: string }> {
  private collectionName: string = '';
  private connectionUri = '';
  protected client: MongoClient;

  constructor(collectionName: string) {
    this.connectionUri = this.getConnectionUri();
    this.collectionName = collectionName;

    this.client = new MongoClient(this.connectionUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  public async create(entity: T) {
    try {
      await this.client.connect();
      const db = this.client.db('Collard');
      await db.collection(this.collectionName).insertOne(entity);
    } catch (e) {
      console.error(e);
    }
    this.client.close();
  }

  public async update(entity: T) {
    try {
      await this.client.connect();
      const db = this.client.db();
      await db
        .collection(this.collectionName)
        .updateOne({ id: entity._id }, entity);
    } catch (e) {
      console.error(e);
    }
    this.client.close();
  }

  public async getOne(id: string) {
    let result = undefined;
    try {
      await this.client.connect();
      const db = this.client.db();
      result = db.collection(this.collectionName).findOne({ _id: id });
    } catch (e) {
      console.error(e);
    }

    return result;
  }

  public async deleteOne(id: string) {
    try {
      await this.client.connect();
      const db = this.client.db();
      await db.collection(this.collectionName).deleteOne({ _id: id });
    } catch (e) {
      console.error(e);
    }

    this.client.close();
  }

  public async getByQuery(query: FilterQuery<T>): Promise<T[] | undefined> {
    let result: T[] | undefined = undefined;
    try {
      await this.client.connect();
      const db = this.client.db();
      result = await db
        .collection(this.collectionName)
        .find(query)
        .toArray();
    } catch (e) {
      console.error(e);
    }

    this.client.close();
    return result;
  }

  public async insertMany(data: T[]) {
    try {
      await this.client.connect();
      const db = this.client.db('Collard');
      await db.collection(this.collectionName).insertMany(data);
    } catch (e) {
      console.error(e);
    }
    this.client.close();
  }

  public async agregate(
    pipeline?: object[] | undefined,
    options?: CollectionAggregationOptions | undefined
  ) {
    let result: T[] | undefined = undefined;
    try {
      await this.client.connect();
      const db = this.client.db();
      result = await db
        .collection(this.collectionName)
        .aggregate(pipeline, options)
        .toArray();
    } catch (e) {
      console.error(e);
    }

    this.client.close();
    return result;
  }

  private getConnectionUri = () => {
    const envVars = dotenv.config({ path: 'src/.env' });
    const connectionUri =
      'mongodb+srv://BonuzAdmin:<password>@collard.1i3y6.mongodb.net/<dbname>?retryWrites=true&w=majority';
    return connectionUri
      .replace('<password>', envVars.parsed?.MONGO_PASSWORD as string)
      .replace('<dbname>', envVars.parsed?.DBNAME as string);
  };
}
