import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface RadioButtonGroupProps {
    radioButtonOptions: any[];
    onChange: (event: any,) => void;
    selectedRadioButton: string;
    sectionLabel: string;

}

export default function RadioButtonGroup({radioButtonOptions, onChange, selectedRadioButton, sectionLabel}: RadioButtonGroupProps) {
    return (
        <FormControl>
            <FormLabel >{sectionLabel}</FormLabel>
                <RadioGroup sx={{ml:2}} value={selectedRadioButton} onChange={onChange}>
                    {radioButtonOptions.map(({value, label}) =>
                    <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
                    )}
                </RadioGroup>
        </FormControl>
    )

}