import { Inject, Injectable } from '@nestjs/common';
import { CreatePhotoDto } from 'src/postgres/photos/dto/create-photo.dto';
import { PhotosService } from 'src/postgres/photos/photos.service';

@Injectable()
export class TelegramService {
  // photosRepository: any;
  // constructor(
  //   // private photossService: PhotosService,
  //   private readonly photosService: PhotosService
  //   ) {}
    
  //   async getAll(){
  //     return this.photosRepository.find()
  //   }
    
  //   create(createPhotoDto: CreatePhotoDto) {
  //     return this.photosRepository.create(createPhotoDto);
  //   }
}
