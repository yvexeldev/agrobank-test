import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;

        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException('Token not found');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token);
            request.user = { id: payload.sub };
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    private extractTokenFromHeader(request: any): string | null {
        const authorization = request.headers.authorization;
        if (authorization && authorization.startsWith('Bearer ')) {
            return authorization.split(' ')[1];
        }
        return null;
    }
}
