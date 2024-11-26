export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  isAI: boolean;
}

export interface LoginFormData {
  username: string;
  password: string;
}