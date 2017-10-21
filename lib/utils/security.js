//@flow
import crypto from 'crypto';
import _ from 'lodash';

export function computeSignature(authId: string, uri: string, params: {[string]: string}): string {
  const joinedParams = uri + _.join(_.map(_.sortBy(_.toPairs(params)), item => item[0] + item[1]), '');
  console.log(joinedParams);
  return crypto.createHmac('sha1', authId).update(joinedParams).digest('base64');
}

export function verifySignature(authId: string, uri: string, params: {[string]: string}, signature: string): boolean {
  return computeSignature(authId, uri, params) === signature;
}
