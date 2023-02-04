//File created to overwrite Express type in order to add the user in request Object
//Check 'ensureAuthenticated' middleware

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
