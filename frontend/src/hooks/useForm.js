import { useState } from "react";

export function useForm(initialFields, cb = () => { }, validate = () => ({})) {
    const [fields, setFields] = useState(initialFields)
    const [errors, setErrors] = useState({});


    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;
            case 'checkbox':
                value = target.checked
                break;
            case 'radio':
                value = target.checked
                break;
                
            default:
                break;
        }

        setFields((prevFields) => ({ ...prevFields, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault();
        const validationErrors = validate(fields);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            cb(fields);
        }
    }


    return [
        fields,
        handleChange,
        setFields,
        handleSubmit,
        errors
    ]

}