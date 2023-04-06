import { Params } from 'react-router-dom';

export function sanitizeURL(url: string, pathVariables?: Readonly<Params<string>>) {
  if (pathVariables && Object.keys(pathVariables).length) {
    return Object.entries(pathVariables).reduce((acc, [key, value]) => {
      return acc.replace(`:` + key, value ?? '');
    }, url);
  }
  return url;
}
