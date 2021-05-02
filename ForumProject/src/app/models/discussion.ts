import { Category } from './category';

export interface Discussion {
  id: number;
  name: string;
  description: string;
  category: Category;
}
