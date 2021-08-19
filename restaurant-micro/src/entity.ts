export default abstract class Entity<T> {
  protected readonly _id: string;
  protected props: T;

  constructor(props: T, id?: string) {
    this._id = id ? id : Math.random().toString();
    this.props = props;
  }

  // other common methods here...
}
