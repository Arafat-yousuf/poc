import { Controller, Get, Logger, Param, Post, Query, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/guards/http/auth.guard';
import { AuthProviderNames } from 'src/models/auth/auth.provider.names';
import { COOKIE_NAME } from 'src/utils/constants';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Public } from './is.public';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService, private userService: UserService) {}

  @Public()
  @ApiOperation({
    summary: 'Checks If the current client is authorised',
    description: 'client can be two types, Admin & User, if client is authorised, token is returned',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized User' })
  @ApiOkResponse({ type: String })
  @Get('/check-login')
  async checkLogin(@Req() req: Request) {
    if (req.cookies && !req.cookies[COOKIE_NAME]) {
      throw new UnauthorizedException();
    }
    const authInfo = await this.authService.verifyRefreshToken(req.cookies[COOKIE_NAME]);
    if (!authInfo) {
      throw new UnauthorizedException('Unauthorized User');
    }
    const accessToken = await this.authService.createAccessToken(authInfo);
    if (accessToken) {
      return accessToken.token;
    }
    throw new UnauthorizedException();
  }

  @Public()
  @ApiOperation({
    summary: 'Open Id login based on Provider',
    description: 'provider can be google, microsoft..., redirects to the login link of that provider',
  })
  @Get('/oauth/:provider')
  async startSignin(@Res() res: Response, @Param('provider') providerName: AuthProviderNames, @Query('state') state?: string) {
    const redirectUrl = await this.authService.getLoginLink(state, providerName);
    res.redirect(redirectUrl);
  }

  @Public()
  @ApiOperation({
    summary: 'This api is not called by client, Its called by the login provider to send the user info',
    description: 'sets cookie with the reponse and also redirects to /login_callback route of the client with token set to params',
  })
  @Get('/oauth_callback/:provider')
  async oauthCallback(@Req() req: Request, @Param('provider') providerName: AuthProviderNames, @Res() res: Response) {
    const response = await this.authService.handleCallback(req, providerName);
    const { userId, email, url } = response;
    if (!userId || !email) {
      this.logger.debug('No user');
      res.redirect(url.origin);
    } else {
      const refreshToken = await this.authService.createRefreshToken(userId, email);

      const token = await this.authService.createAccessToken({
        userId,
        email,
      });
      res.cookie(COOKIE_NAME, refreshToken, {
        httpOnly: true,
      });
      res.redirect(`${url.origin}/login_callback?access_token=${token.token}&state=${url.pathname}`);
    }
  }

  @Post('/logout')
  @ApiOperation({
    summary: 'Logs out user, clears the cookie',
  })
  @UseGuards(AuthGuard)
  async logOut(@Res() res: Response) {
    res.clearCookie(COOKIE_NAME);
    res.status(200).json('Logout Successful');
  }
}
