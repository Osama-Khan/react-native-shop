type FilterOperator =
  | '='
  | '>'
  | '<'
  | '>='
  | '<='
  | '!='
  | 'like'
  | 'not like';

export default class Criteria<T extends Object> {
  private limit?: number;
  private page?: number;
  private relations: string[] = [];
  private orderBy?: string;
  private orderDir?: 'ASC' | 'DESC';
  private filters: Partial<T> = {};

  validKeys: string[] = [];

  constructor(from?: Criteria<T>) {
    if (from) {
      this.limit = from.limit;
      this.page = from.page;
      this.relations = [...from.relations];
      this.orderBy = from.orderBy;
      this.orderDir = from.orderDir;
      this.filters = {...from.filters};
    }
  }

  getUrlParameters(): string {
    const params: string[] = [];

    if (this.limit) {
      params.push(`limit=${this.limit}`);
    }
    if (this.page) {
      params.push(`page=${this.page}`);
    }
    if (this.relations.length > 0) {
      const incs = this.relations.join(';');
      params.push(`relations=${incs}`);
    }
    if (this.orderBy) {
      params.push(`orderBy=${this.orderBy}`);
    }
    if (this.orderDir) {
      params.push(`orderDirection=${this.orderDir}`);
    }
    if (Object.keys(this.filters).length > 0) {
      let filt: string[] = [];
      for (let prop in this.filters) {
        const key = prop.toString();
        const value = this.filters[prop];
        if (Object.prototype.hasOwnProperty.call(this.filters, prop)) {
          filt.push(`${key}:${value}`);
        }
      }
      const filtString = filt.join(';');
      params.push(`filters=${filtString}`);
    }

    return params.length > 0 ? `?${params.join('&')}` : '';
  }

  setLimit(lim: number) {
    if (lim > 0) {
      this.limit = lim;
    }
  }

  setPage(page: number) {
    if (page > 0) {
      this.page = page;
    }
  }

  addRelation(include: Extract<keyof T, string>) {
    if (!this.relations.includes(include)) {
      this.relations.push(include);
    }
  }

  removeRelation(include: Extract<keyof T, string>) {
    this.relations = this.relations.filter((i: string) => i !== include);
  }

  setOrderBy(orderBy: Extract<keyof T, string>) {
    this.orderBy = orderBy;
  }

  setOrderDir(orderDir: 'ASC' | 'DESC') {
    this.orderDir = orderDir;
  }

  addFilter = (
    key: Extract<keyof T, string>,
    value: any,
    operator?: FilterOperator,
  ) => {
    this.filters[key] = ((operator ? operator + ':' : '=:') + value) as any;
  };

  removeFilter = (key: Extract<keyof T, string>) => {
    delete this.filters[key];
  };
}
