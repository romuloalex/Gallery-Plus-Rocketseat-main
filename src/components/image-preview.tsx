import type React from "react";
import { tv } from "tailwind-variants";

const ImageFilePreviewVariants = tv({
    base: `
        rounded overflow-hidden
    `
})

const ImageFilePreviewImageVariants = tv({
    base: `
        w-full h-full object-cover
    `
})

interface ImagePreviewProps extends React.ComponentProps<'img'> {
    imageClassName?: string;
}

export default function ImagePreview({
    className,
    imageClassName,
    ...props
}: ImagePreviewProps) {
    return (
        <div className={ImageFilePreviewVariants({className})}>
            <img className={ImageFilePreviewImageVariants({className: imageClassName})} {...props} />
        </div>
    )
}