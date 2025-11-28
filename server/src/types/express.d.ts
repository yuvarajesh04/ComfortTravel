// types/express.d.ts
export {};

declare global {
  namespace Express {
    interface Request {
      user?: {
        email: string;
        name: string;
        userType: "admin" | "user";
      };
    }
  }
}
