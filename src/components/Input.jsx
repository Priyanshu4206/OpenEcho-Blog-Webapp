import { forwardRef, useId } from 'react'

const InputComponent = ({ label, type = "text", classname = "", ...props }, ref) => {
    const id = useId();
    return (
        <div className="w-full">
            {label && (
                <label
                    htmlFor={id}
                    className='inline-block mb-1 pl-1 font-bold'>
                    {label}
                </label>
            )}
            <input
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${classname}`}
                type={type}
                id={id}
                ref={ref}
                {...props}
            />
        </div>
    )
};
/* 
    forwardRef() is used inorder to pass the value from the input component to the form component since data cannot be passed in the react from the lower level to higher level component 
*/
const Input = forwardRef(InputComponent)

export default Input