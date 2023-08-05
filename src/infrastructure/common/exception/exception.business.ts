/* eslint-disable @typescript-eslint/naming-convention */
import { HttpStatus } from '@nestjs/common';

export type ErrorDomain = 'users' | 'orders' | 'generic';

/**
 * BusinessException is a custom error class that is used to throw
 * business exceptions. It is used to distinguish between
 * business exceptions and other exceptions (e.g. system exceptions).
 * It is also used to unify the way exceptions are handled in the application.
 *
 * @export
 * @class BusinessException
 *
 * @param {ErrorDomain} domain
 * @param {string} message
 * @param {string} apiMessage
 * @param {HttpStatus} status
 *
 * @extends {Error}
 *
 * @example
 * throw new BusinessException(
 *  'users',
 * 'User with this email already exists',
 * 'User already exists',
 * HttpStatus.CONFLICT,
 * );
 *
 *
 */
export class BusinessException extends Error {
  public readonly id: string;
  public readonly timestamp: Date;

  constructor(
    public readonly domain: ErrorDomain,
    public readonly message: string,
    public readonly apiMessage: string,
    public readonly status: HttpStatus,
  ) {
    super(message);
    this.id = BusinessException.genId();
    this.timestamp = new Date();
  }

  private static genId(length = 16): string {
    const p = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from<string>({ length }).reduce(
      (a) => a + p[Math.trunc(Math.random() * p.length)],
      '',
    );
  }
}
