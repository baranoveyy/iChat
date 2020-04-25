export interface User {
  userName: string;
  password: string;
}

interface Auth {
  isLoggedIn?: boolean;
  user?: User;
}

type AuthState = Readonly<Auth>;

export default AuthState;
