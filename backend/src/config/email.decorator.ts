import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Returns the email of the current user
 */
export const GetEmail = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  return req.user.email;
});
