import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;

    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            }) as FilterQuery<T>
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj: { [key: string]: unknown } = { ...this.query };
    const excludeFields = [
      "searchTerm",
      "sort",
      "limit",
      "page",
      "fields",
      "max",
      "min",
      "stock",
    ];
    excludeFields.forEach((el) => delete queryObj[el]);

    if (this.query.max || this.query.min) {
      queryObj.price = {};

      if (this.query.max) {
        (queryObj.price as any).$lte = Number(this.query.max);
      }

      if (this.query.min) {
        (queryObj.price as any).$gte = Number(this.query.min);
      }
    }

    if (this.query.stock) {
      queryObj.status = {};

      (queryObj.status as any).$ne = "OUT-OF-STOCK";
    }

    if (this.query.category) {
      queryObj.category = {};
      const reMakeCategory = (this.query.category as string)
        .toString()
        .replace(",", " ");

 
      (queryObj.category as any).$eq = reMakeCategory;
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(",")?.join(" ") || "-createdAt";

    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 9999;
    const skip = (page - 1) * limit;
 
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;


  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }


  
}

export default QueryBuilder;
