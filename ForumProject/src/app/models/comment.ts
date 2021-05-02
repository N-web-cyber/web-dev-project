import { Topic } from "./topic";
import { User } from "./user";

export interface Comment {
  id: number;
  content: string;
  date: Date;
  author: User;
  topic: Topic;
}