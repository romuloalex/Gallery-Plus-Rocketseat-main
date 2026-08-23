import React from "react";
import { Dialog, DialogBody, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../../../components/dialog";
import Button from "../../../components/button";
import InputText from "../../../components/input-text";
import Alert from "../../../components/alert";
import InputSingleFile from "../../../components/input-single-file";
import ImagePreview from "../../../components/image-preview";
import Text from "../../../components/text";
import Skeleton from "../../../components/skeleton";
import { useForm } from "react-hook-form";
import useAlbums from "../../albums/hooks/use-albums";
import { photoNewFormSchema, type PhotoNewFormSchema } from "../schemas";
import {zodResolver} from '@hookform/resolvers/zod'
import usePhoto from "../hooks/use-photo";

interface PhotoNewDialogProps {
    trigger: React.ReactNode;
}

export default function PhotoNewDialog({trigger}:PhotoNewDialogProps) {
    const form = useForm<PhotoNewFormSchema>({
        resolver: zodResolver(photoNewFormSchema) //resolve o formulário com basse no schema
    });
    const [ isCreatingPhoto, setIsCreatingPhoto ] = React.useTransition();
    const {CreatePhoto} = usePhoto();
    const {albums, isLoadingAlbums} = useAlbums();
    const file = form.watch('file');
    const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;
    const [ modalOpen, setModalOpen ] = React.useState(false)

    React.useEffect(() => {
        if (!modalOpen) {
            form.reset();
        }
    }, [modalOpen, form])

    function handleSubmit(payload: PhotoNewFormSchema) {
        setIsCreatingPhoto(async () => {
            await CreatePhoto(payload);
            setModalOpen(false)
        })
    }

    const albumsIds = form.watch('albumsIds');

    function handleToggleAlbum(albumId:string) {
        const albumsIds = form.getValues('albumsIds');
        const albumsSet = new Set(albumsIds);//Set evita valores repetidos

        if (albumsSet.has(albumId)){
            albumsSet.delete(albumId)
        } else {
            albumsSet.add(albumId)
        }

        form.setValue('albumsIds', Array.from(albumsSet))
    }
    
    return <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <DialogHeader>Adicionar foto</DialogHeader>
                <DialogBody className="flex flex-col gap-5">
                    <InputText
                        placeholder="Adicionar um título"
                        maxLength={255}
                        error={form.formState.errors.title?.message}
                        {...form.register('title')}
                    />
                    <Alert>
                        Tamanho máximo: 50MB
                        <br />
                        Você pode selecionar arquivos em PNG, JPG ou JPEG
                    </Alert>
                    <InputSingleFile 
                        form={form}
                        allowedExtensions={['png', 'jpg', 'jpeg']}
                        maxFileSizeInMB={50}
                        replaceBy={
                            <ImagePreview src={fileSource} className="w-full h-56" />
                        }
                        error={form.formState.errors.file?.message}
                        {...form.register('file')}
                    />
                    <div className="space-y-3">
                        <Text variant="label-small">Selecionar álbuns</Text>
                        <div className="flex flex-wrap gap-3">
                            {!isLoadingAlbums && albums.length > 0 
                                && albums.map(album => 
                                    <Button
                                        key={album.id}
                                        variant={albumsIds?.includes(album.id) ? 'primary' : 'ghost'}
                                        size="sm"
                                        className="truncate"
                                        onClick={() => handleToggleAlbum(album.id)}
                                    >{album.title}</Button>
                                )
                            }
                            {
                                isLoadingAlbums && Array.from({length: 5}).map((_, index) => (
                                    <Skeleton 
                                        key={`album-loading-${index}`}
                                        className="w-20 h-7"
                                    />
                                ))
                            }
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary" disabled={isCreatingPhoto}>Cancelar</Button>
                    </DialogClose>
                    <Button 
                        type="submit" 
                        variant="primary" 
                        disabled={isCreatingPhoto}
                        handling={isCreatingPhoto}
                    >{isCreatingPhoto ? 'Adicionando...' : 'Adicionar'}</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
}