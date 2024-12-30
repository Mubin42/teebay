// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const token = request.headers.authorization;
//
//     // Check if the token is valid
//     return this.validateToken(token);
//   }
//
//   private async validateToken(token: string): Promise<boolean> {
//     // Check if the token is valid
//     return true;
//   }
// }
