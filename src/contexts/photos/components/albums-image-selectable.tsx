import React from "react";
import ImagePreview from "../../../components/image-preview";
import { tv } from "tailwind-variants";
import InputCheckbox from "../../../components/input-checkbox";

export const PhotoImageSelectableVariants = tv({
    base: 'cursor-pointer relative rounded-lg',
    variants: {
        select: {
            true: 'outline-2 outline-accent-brand'
        }
    },
    defaultVariants: {
        select: true
    }
})

interface PhotoImageSelectableProps extends React.ComponentProps<typeof ImagePreview>{
    selected?: boolean
    onSelectImage?: (selected: boolean) => void;
}

export default function PhotoImageSelectable({
    className,
    selected,
    onSelectImage,
    ...props
}:PhotoImageSelectableProps) {
    const [ isSelected, setIsSelected ] = React.useState(selected);

    function handleSelect() {
        const newValue = !isSelected
        setIsSelected(newValue);
        onSelectImage?.(newValue)
    }

    return <label
        className={PhotoImageSelectableVariants({className, select: isSelected})}
    >
        <InputCheckbox 
            size="sm"
            defaultChecked={isSelected}
            onChange={handleSelect}
            className="absolute top-1 left-1"
        />
        <ImagePreview {...props} />
    </label>    
}