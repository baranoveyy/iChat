export interface User {
  userName: string;
  password: string;
}

interface Auth {
  isLoggedIn?: boolean;
  cognitoUser?;
  currentUser?;
  users?: any[];
}

type AuthState = Readonly<Auth>;

export default AuthState;
