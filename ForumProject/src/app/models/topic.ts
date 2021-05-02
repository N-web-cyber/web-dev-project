import { Discussion } from "./discussion";
import { User } from "./user";
import { Comment } from "./comment";

export interface Topic {
  id: number;
  title: string;
  description: string;
  author: User;
  discussion: Discussion;
  comments?: Comment[];
}
