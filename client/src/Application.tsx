import { useState, useEffect } from "react";
import { useLoaderData } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import FormRow from './FormRow.tsx';

function Application() {
    const appData = useLoaderData();
    const id = appData.id;
    const {
        register,
        getValues,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const [cost, setCost] = useState(null);

    useEffect(() => {
        const savedFormData = localStorage.getItem(`formData${appData.id}`);
        if (savedFormData) {
            const savedData = JSON.parse(savedFormData); 
            Object.keys(savedData).forEach(name => {
                setValue(name, savedData[name]);
            });
        }
    }, []);

    function removeEmptyFields(data) {
        Object.keys(data).forEach(key => {
          if (data[key] === '' || data[key] == null) {
            delete data[key];
          }
        });
      }
      
    const handleSave = async () => {
        const data = getValues();
        removeEmptyFields(data);
        try {
            const resp = await fetch(`http://localhost:8000/applications/${id}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
          if (!resp.ok) {
            alert('Error updating form');
          }

        } catch (error) {
          alert('Error updating form');
        }
        localStorage.removeItem(`formData${appData.id}`);
      };

    const onSubmit = async (data) => {
        removeEmptyFields(data);
        try {
            const resp = await fetch(`http://localhost:8000/applications/${id}/submit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            });

            const result = await resp.json();
            setCost(result.cost);
            if (!resp.ok) {
                alert('Error submitting form');  
            }
        } catch (error) {
            alert('Error submitting form');
        }
        localStorage.removeItem(`formData${appData.id}`);
    };
      
    return (
        <div className="App">
            <h1>Application form {id}</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormRow fieldName="firstName" appData={appData} register={register} errors={errors}/>
                <FormRow fieldName="lastName" appData={appData} register={register} errors={errors}/>
                <FormRow fieldName="dOb" appData={appData} register={register} errors={errors}/>
                <FormRow fieldName="street" appData={appData} register={register} errors={errors}/>
                <FormRow fieldName="city" appData={appData} register={register} errors={errors}/>
                <FormRow fieldName="state" appData={appData} register={register} errors={errors}/>
                <FormRow fieldName="zip" appData={appData} register={register} errors={errors}/>
                <FormRow fieldName="vin" appData={appData} register={register} errors={errors}/>
                <FormRow fieldName="year" appData={appData} register={register} errors={errors}/>
                <FormRow fieldName="make" appData={appData} register={register} errors={errors}/>
                <FormRow fieldName="model" appData={appData} register={register} errors={errors}/>

                <div className="form-control">
                    <button onClick={handleSave}type="button">Save</button>
                    <button type="submit">Get Quote</button>
                </div>
            </form>
            {cost !== null && (
                <div>
                    <h2>Cost estimate:</h2>
                    <p>{cost}</p>
                </div>
            )}
        </div>
    );
}


export default Application;
