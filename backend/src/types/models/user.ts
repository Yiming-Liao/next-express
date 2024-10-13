export interface User {
  id: number;
  username: string;
  email: string;
  password: string; // 如果不想返回密碼，考慮使用可選屬性
}
