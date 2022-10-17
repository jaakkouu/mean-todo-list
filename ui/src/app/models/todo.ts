export interface APITodo {
  _id: any;
  name: string;
}

export interface UITodo extends Omit<APITodo, '_id'> {
  id: string;
}
