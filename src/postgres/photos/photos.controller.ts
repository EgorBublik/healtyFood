import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  public create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photosService.create(createPhotoDto);
  }

  @Get()
  getAll() {
    return this.photosService.getAll();
  }

  @Get('/:telegramId')
  getPhotosUser(@Param('telegramId') telegramId: string) {
    return this.photosService.getPhotosUser(telegramId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.photosService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePhotoDto: UpdatePhotoDto) {
  //   return this.photosService.update(+id, updatePhotoDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.photosService.remove(+id);
  // }
}
