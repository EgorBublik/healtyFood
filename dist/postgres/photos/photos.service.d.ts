import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './entities/photo.entity';
export declare class PhotosService {
    private photosRepository;
    constructor(photosRepository: Repository<Photo>);
    getAll(): Promise<Photo[]>;
    create(createPhotoDto: CreatePhotoDto): Promise<CreatePhotoDto & Photo>;
    getPhotosUser(telegramId: string): Promise<Photo[]>;
}
