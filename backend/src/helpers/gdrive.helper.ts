import { Inject, Injectable } from '@nestjs/common';
import { drive, auth } from '@googleapis/drive';
import { appConfig } from 'src/configuration';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class GoogleDriveService {
  private readonly drive;

  constructor(
    @Inject(appConfig.KEY)
    private config: ConfigType<typeof appConfig>,
    private refresh_token?: string,
  ) {
    const gauth = new auth.OAuth2({
      clientId: this.config.jwt.google.clientId,
      clientSecret: this.config.jwt.google.clientSecret,
      redirectUri: '', // Add your redirect URIs here if applicable
    });

    gauth.setCredentials({ refresh_token: this.refresh_token });
    // const accessToken = req.headers.get('authorization')?.replace('Bearer ', '');
    // gauth.setCredentials({ access_token: accessToken });

    this.drive = drive({ version: 'v3', auth: gauth });
  }

  async listFiles(): Promise<any> {
    try {
      const folderId = '1TMuLwODzXwawT6e_bk2DBQqwT3c-xk5p18RVgDED05g';
      const owners = 'me';
      const mimeType = 'image/';
      const response = await this.drive.files.list({
        q: `'${folderId}' in parents and '${owners}' in owners and mimeType contains '${mimeType}'`, // Filter to retrieve only image files
        fields: 'files(id, name, imageMediaMetadata)', // Specify the fields to retrieve, including imageMediaMetadata
      });

      return response.data.files;
    } catch (error) {
      throw new Error(`Unable to list files: ${error.message}`);
    }
  }

  async getStartPageToken(): Promise<any> {
    try {
      const response = await this.drive.changes.getStartPageToken({});

      console.log(response);
      return response;
    } catch (error) {
      throw new Error(`Unable to list files: ${error.message}`);
    }
  }

  async syncChanges(): Promise<any> {
    try {
      const response = await this.drive.changes.list({ pageToken: '1', fields: '*' });

      console.log(JSON.stringify(response, null, 1));
      return response;
    } catch (error) {
      throw new Error(`Unable to list files: ${error.message}`);
    }
  }
}
