export default interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  provider: string; // Credentials - Google, Facebook, Twitter, etc.
  image: string;
}
