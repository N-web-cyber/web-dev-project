import { Discussion } from "./discussion";

export interface Category {
  id: number;
  name: string;
  discussions?: Discussion[];
}
