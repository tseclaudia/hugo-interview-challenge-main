const maxYear = new Date().getFullYear()+1;

const mapping = {
    "firstName": {
        "inputType": "text",
        "label": "First Name",
    },
    "lastName": {
        "inputType": "text",
        "label": "Last Name",
    },
    "dOb": {
        "inputType": "date",
        "label": "Date of Birth",
    },
    "street": {
        "inputType": "text",
        "label": "Street"
    },
    "city": {
        "inputType": "text",
        "label": "City"
    },
    "state": {
        "inputType": "text",
        "label": "State"
    },
    "zip": {
        "inputType": "number",
        "label": "ZIP",
        "valueAsNumber": true
    },
    "vin": {
        "inputType": "text",
        "label": "VIN"
    },
    "year": {
        "inputType": "number",
        "label": "Year",
        "valueAsNumber": true,
        "validations": {
            min: 1985, max: maxYear
        }
    },
    "make": {
        "inputType": "text",
        "label": "Make"
    },
    "model": {
        "inputType": "text",
        "label": "Model"
    }

}


function FormRow({fieldName, appData, register, errors}) {
   const fieldInfo = mapping[fieldName];

   const saveFormData = (updatedData) => {
    localStorage.setItem(`formData${appData.id}`, JSON.stringify(updatedData));
    };

    const handleInputChange = (event) => {
        const savedFormDataString = localStorage.getItem(`formData${appData.id}`);
        const savedFormData = savedFormDataString ? JSON.parse(savedFormDataString) : {};

        const { name, value } = event.target;
        const updatedFormData = { ...savedFormData, [name]: value };

        saveFormData(updatedFormData);
    };

    if (!fieldInfo) {
        return null;
    }
    return (
        <div className="form-control">
            <label>{fieldInfo.label}</label>
            <input 
                type={fieldInfo.inputType}
                name={fieldName}
                {...register(fieldName, {
                    required: `${fieldInfo.label} is required.`,
                    valueAsNumber: (fieldInfo.valueAsNumber || false),
                    ...fieldInfo.validations
                })}
                defaultValue={appData[fieldName] || null}
                onChange={handleInputChange}
            />
            {errors[fieldName] && <p className="errorMsg">{errors[fieldName].message || `${fieldInfo.label} is not valid.`}</p>}
        </div>
    );
}

export default FormRow;