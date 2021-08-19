import { ApiProperty } from '@nestjs/swagger';

export class Google {
  @ApiProperty({ required: false })
  logo?: string;

  @ApiProperty({ required: false })
  googleID?: string;

  @ApiProperty({ required: false })
  googleVerified?: string;
}
