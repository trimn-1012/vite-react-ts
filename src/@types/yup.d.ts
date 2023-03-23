import * as yup from 'yup';

declare module 'yup' {
  interface StringSchema {
    password(message: string): yup.StringSchema<string>;
  }
}
