import React, { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';

const FormContext = createContext();

export const useFormContext = () => {
    return useContext(FormContext);
};

const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState(() => {
        const storedData = localStorage.getItem('formData');
        return storedData ? JSON.parse(storedData) : {
            form1: {
                name: "",
                email: "",
                age: 25,
                phone: "",
                emergency_phone: "",
                emergency_phone_name: "",
                gender: "",
                completed1: false,
            },
            form2: {
                completed2: false,
            },
            form3: {
                completed3: false,
            },
        };
    });

    const updateFormData = (fieldName, value) => {
        setFormData((prevData) => ({
            ...prevData,
            form1: {
                ...prevData.form1,
                [fieldName]: value,
            },
        }));
    };

    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);

    return (
        <FormContext.Provider value={{ ...formData, updateFormData }}>
            {children}
        </FormContext.Provider>
    );
};

export default FormProvider;
