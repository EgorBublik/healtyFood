import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photo } from './entities/photo.entity';

@Injectable()
export class PhotosService {
  
  constructor(
    @InjectRepository(Photo) 
    private photosRepository: Repository<Photo>,
  ) {}
  
  async getAll(){
    return await this.photosRepository.find()
  }
  
  async create(createPhotoDto: CreatePhotoDto) {
    return await this.photosRepository.save(createPhotoDto);
  }

  // async getById(id: number){
  //   return this.photosRepository.getId()
  // }

  

  // findAll() {
  //   return `This action returns all photos`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} photo`;
  // }

  // update(id: number, updatePhotoDto: UpdatePhotoDto) {
  //   return `This action updates a #${id} photo`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} photo`;
  // }
}
