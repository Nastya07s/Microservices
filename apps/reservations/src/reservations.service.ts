import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { Types } from 'mongoose';
import { PAYMENTS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(private reservationsRepository: ReservationsRepository, @Inject(PAYMENTS_SERVICE) private readonly paymentsService: ClientProxy) {}

  async create(createReservationDto: CreateReservationDto, userId: string) {
    return this.paymentsService.send('create_charge', createReservationDto.charge).pipe(
      map((res) => {
        console.log(res);
        return this.reservationsRepository.create({
          ...createReservationDto,
          timestamp: new Date(),
          invoiceId: res.id,
          userId,
        });
      }),
    );
  }

  async findAll() {
    return this.reservationsRepository.find({});
  }

  async findOne(id: string) {
    return this.reservationsRepository.findOne({ _id: new Types.ObjectId(id) });
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate({ _id: new Types.ObjectId(id) }, { $set: updateReservationDto });
  }

  async remove(id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id: new Types.ObjectId(id) });
  }
}
