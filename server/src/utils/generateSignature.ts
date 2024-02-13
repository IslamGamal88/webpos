import { createHmac } from 'crypto';
import { getCurrentDateTime } from './getCurrentDateTime';

export const generateSignature = (
  url: string,
  method: string,
  queryParams: object,
  token: string,
  secret: string,
  body?: object,
) => {
  const sortedQueryParamsString = Object.values(queryParams).sort().join('');

  const sortedBodyString = body ? Object.values(body).sort().join('') : null;

  const sortedResult = [sortedBodyString, sortedQueryParamsString]
    .sort()
    .join('');

  const signature = `${url}${method.toUpperCase()}${sortedResult}${getCurrentDateTime(4)}${token}`;

  const signedSignature = createHmac('sha512', secret)
    .update(signature)
    .digest('hex');

  console.log('signature', signature);
  console.log('signedSignature', signedSignature);
  return signedSignature;
};
