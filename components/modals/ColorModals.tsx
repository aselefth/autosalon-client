import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { useAddColorMutation, useGetColorByIdQuery, useUpdateColorMutation } from "../../store/ColorSlice";
import { setIsModalClose } from "../../store/ModalSlice";

export const AddColorsModal = () => {
    const [color, setColor] = useState('');
    const [addColor] = useAddColorMutation();
    const dispatch = useAppDispatch();

    const handleAddColor = async(colorHex: string) => {
        await addColor({colorHex: colorHex});
    }

    return (
        <form
            className="flex flex-col gap-4 font-light italic"
            onSubmit={(e) => {
                e.preventDefault();
                color.length === 6 && handleAddColor(color);
                dispatch(setIsModalClose());
            }}
        >
            <input 
                placeholder="colorHex..."
                type='text' 
                value={color} 
                onChange={(e) => setColor(e.target.value)}
                className='border rounded outline-none'
            />
            <button
            className="py-2 bg-yellow-200 font-bold rounded" 
                type='submit'
            >
                add
            </button>
        </form>
    )
}

interface UpdateColorsModalProps {
    colorId: number
}

export const UpdateColorsModal: NextPage<UpdateColorsModalProps> = ({colorId}) => {
    const {data: color} = useGetColorByIdQuery(colorId);
    const [colorHex, setColorHex] = useState('');
    const [updateColor] = useUpdateColorMutation();
    const dispatch = useAppDispatch();

    const handleUpdateColor = async(color: {colorId: number, colorHex: string}) => {
        await updateColor(color);
    }

    useEffect(() => {
        color && setColorHex(color.colorHex)
    }, [color])

    return (
        <form
            className="flex flex-col gap-4 font-light italic"
            onSubmit={(e) => {
                e.preventDefault();
                colorHex.length === 6 && handleUpdateColor({colorId: color.colorId, colorHex: colorHex});
                colorHex.length === 6 && dispatch(setIsModalClose());
            }}
        >
            <input 
                placeholder={color && color.colorHex}
                type='text' 
                value={colorHex} 
                onChange={(e) => setColorHex(e.target.value)}
                className='border rounded outline-none'
            />
            <button
            className="py-2 bg-yellow-200 font-bold rounded" 
                type='submit'
            >
                update
            </button>
        </form>
    )
}