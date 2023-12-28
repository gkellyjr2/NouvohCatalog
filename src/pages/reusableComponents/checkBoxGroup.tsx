import { useState } from "react";
import { FormLabel, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

interface CheckBoxGroupProps {
    sectionLabel: string;
    checkBoxNames: string[];
    CheckedBoxes?: string[];
    onChange: (BoxesChecked: string[]) => void;
}

export default function CheckBoxGroup({sectionLabel, checkBoxNames, CheckedBoxes, onChange}: CheckBoxGroupProps) {
    const [checkedBoxesArray, setCheckedBoxesArray] = useState<string[]>(CheckedBoxes || []);

    function updateCheckedBoxesArray(checkedBox: string) {
        let newCheckedBoxesArray: string[] = [];
        const currentIndex = checkedBoxesArray.findIndex(item => item === checkedBox)

        if (currentIndex === -1) newCheckedBoxesArray = [...checkedBoxesArray, checkedBox];
        else newCheckedBoxesArray = (checkedBoxesArray.filter(item => item !== checkedBox));

        setCheckedBoxesArray(newCheckedBoxesArray);
        onChange(newCheckedBoxesArray);
    }
    return (
        <>
            <FormLabel >{sectionLabel}</FormLabel>
                <FormGroup sx={{ml:2}}>
                {checkBoxNames.map(item => 
                    <FormControlLabel key={item} 
                    label={item}
                    control={<Checkbox checked = {checkedBoxesArray.includes(item)}
                    onClick={() => updateCheckedBoxesArray(item)}
                    />}
                    />
                )}
            </FormGroup>
        </>
    )
}