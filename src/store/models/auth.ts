export interface User {
  userName: string;
  password: string;
}

interface Auth {
  isLoggedIn?: boolean;
  cognitoUser?;
  currentUser?;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  users?: any[];
}

type AuthState = Readonly<Auth>;

export default AuthState;
