import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../strategies';

interface AuthRequest extends Request {
  user: JwtPayload;
}
export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthRequest>();
    const user = request.user;

    // return data ? user?.[data] : user;
    return user;
  },
);
