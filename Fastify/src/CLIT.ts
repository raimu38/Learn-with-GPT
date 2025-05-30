import { randomUUID } from "crypto";

class User {
  id: string;
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.id = randomUUID();
    this.name = name;
    this.age = age;
    console.log(this.id);
  }
  post(content: string): string {
    const newPost = new Post(content, this);
    const timeline = new Timeline();
    timeline.posts.push(newPost);
    return `Post Success data:${newPost.createdAt}, content:${newPost.content} id:${newPost.id}`;
  }
}

class Post {
  id: string;
  content: string;
  userId: string;
  createdAt: Date;

  constructor(content: string, user: User) {
    this.id = randomUUID();
    this.content = content;
    this.userId = user.id;
    this.createdAt = new Date();
  }
}

class Timeline {
  posts: Post[];
  constructor() {
    this.posts = [];
  }
}

const userA = new User("nogi", 39);
console.log(userA.post("hello World"));
