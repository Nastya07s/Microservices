import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('http/localcost/sleepr')],
})
export class DatabaseModule {}
