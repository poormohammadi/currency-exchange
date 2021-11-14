import './NumberInput.css';

import React from 'react';

const DECIMAL_NUMBER_REGEX = /^\d*\.?\d*$/;
const SPACE = '\u00A0';

type Props = {
    value?: string;
    onChange: (v: string) => void;
    error?: string;
    type: 'withdraw' | 'deposit';
    disabled?: boolean;
}

export default function NumberInput(props: Props) {
    function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { value } = e.target;
        const reg = new RegExp(DECIMAL_NUMBER_REGEX);
        // This component is working with string to avoid 'unctrolled component' error
        // But I make sure its value is always a number
        // https://reactjs.org/docs/uncontrolled-components.html
        if ((reg.test(value) || !value) && value !== '.')
            props.onChange(e.target.value);
    }

    return (
        <div>
            <div className="NumberInput-input-box">
                <span className="NumberInput-sign">{props.type === 'withdraw' ? '-' : '+'}</span>
                <input disabled={props.disabled} className="NumberInput-input" value={props.value} onChange={onValueChange} />
            </div>
            <div className="NumberInput-error">{props.error || SPACE}</div>
        </div>
    )
}
