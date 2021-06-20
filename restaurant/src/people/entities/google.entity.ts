import { ApiProperty } from '@nestjs/swagger';

export class Google {
  @ApiProperty()
  logo: string;

  @ApiProperty()
  googleID: string;

  @ApiProperty()
  googleVerified: string;
}
