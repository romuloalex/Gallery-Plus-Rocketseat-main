import Skeleton from "../../../components/skeleton";
import Text from "../../../components/text";
import type { Photo } from "../models/photo";
import PhotoWidget from "./photo-widget";


interface PhotosListProps {
    photos: Photo[];
    loading?: boolean;
}

export default function PhotosList({photos, loading}:PhotosListProps) {
    return (
        <div className="spcae-y-6">
            <Text
                as="div"
                variant="paragraph-large"
                className="flex items-center justify-end text-accent-span gap-1"
            >
                Total: {''}
                {
                    !loading ? (
                        <div>{photos.length}</div>
                    ) : (
                        <Skeleton className="w-6 h-6" />
                    )
                }
            </Text>
            <div className="grid grid-cols-5 gap-9">
            {!loading && photos?.length > 0 && photos.map((photo) => (
                <PhotoWidget
                    key={photo.id}
                    photo={photo}
                />
            ))}
            </div>
            <div className="grid grid-cols-5 gap-9">
            {loading && Array.from({length: 10}).map((_, index) => (
                <PhotoWidget 
                    key={`photo-loading-${index}`}
                    photo={{} as Photo}
                    loading
                />
            ))}
            </div>
            {!loading && photos.length === 0 && (
                <div className="flex justify-center items-center h-full">
                    <Text variant="paragraph-large">Nenhuma foto encontrada</Text>
                </div>
            )}
        </div>
    )
}