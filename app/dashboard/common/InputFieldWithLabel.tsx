
import styles from "./InputFieldWithLabel.module.css"
import {max} from "@popperjs/core/lib/utils/math";

export interface InputFieldWithLabelProps {
    labelText: string
    maxLength?: number
    errorText?: string
    placeholder?: string
    value?: string
    readOnly?: boolean
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    id?: number
}

export default function InputFieldWithLabel({id, maxLength, labelText, errorText, placeholder, value = undefined, readOnly = false, onChange = () => null}: InputFieldWithLabelProps) {
    return (
        <div className={styles.inputBox}>
            <label>
                {labelText}
            </label>
            <input
                key={id}
                maxLength={maxLength}
                defaultValue={value}
                onChange={readOnly ? onChange : undefined}
                readOnly={readOnly}
                placeholder={placeholder}/>
            {
                errorText &&
                <span>
                    {errorText}
                </span>
            }
        </div>
    )
}