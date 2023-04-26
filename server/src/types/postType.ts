export interface postType {
  user: string;
  caption: string;
  image?: string;
  date: number;
}

export interface CommentType {
  comment: string;
  id: string;
  name: string;
  profile: string | null;
  Date: number;
}
