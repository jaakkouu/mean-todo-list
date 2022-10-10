conn = new Mongo();
db = conn.getDB("todo_db");

db.todos.drop();

db.createCollection("todos");

db.todos.insert({ name: "Todo 1" });
db.todos.insert({ name: "Todo 2" });
db.todos.insert({ name: "Todo 3" });
db.todos.insert({ name: "Todo 4" });
