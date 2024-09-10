import React, { useState } from 'react';


function InputText({ labelTitle, lableStyle, type, containerStyle, defaultValue, updateFormValue, updateType, autoFocus, placeholder, inputStyle}) {
    const [value, setValue] = useState(defaultValue);

    const updateInputValue = (val) => {
        setValue(val);
        updateFormValue({ updateType, value: val});
    }

    return ( 
        <div className={`${containerStyle}`}>
            <label>
                <span className={`${lableStyle}`}>{labelTitle}</span>
            </label>
            <input type={type || "text"} autoFocus={autoFocus} placeholder={placeholder || ""} 
                    onChange={(e) => updateInputValue(e.target.value)}
                    value={value || defaultValue}
                    className={`${inputStyle}`}  name={updateType}/>
        </div>
     );
}

export default InputText;