export const appConfig = {
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000",
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "MyNextApp", //  local storage 儲存用戶資料的 名稱  key
};
