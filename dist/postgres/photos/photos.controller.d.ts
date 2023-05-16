import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
export declare class PhotosController {
    private readonly photosService;
    constructor(photosService: PhotosService);
    create(createPhotoDto: CreatePhotoDto): Promise<CreatePhotoDto & import("./entities/photo.entity").Photo>;
    getAll(): Promise<import("./entities/photo.entity").Photo[]>;
    getPhotosUser(telegramId: string): Promise<import("./entities/photo.entity").Photo[]>;
}
