import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

export default function MySelect<
  T extends string | number | readonly string[] | undefined,
>(props: {
  title: string;
  value: T;
  setValue: (newValue: T) => void;
  selectValues: { label: string; value: T }[];
}) {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">{props.title}</InputLabel>
      <Select
        labelId="select-label"
        value={props.value?.toString()}
        label={props.title}
        onChange={(event: SelectChangeEvent) => {
          props.setValue(event.target.value as T);
        }}
      >
        {props.selectValues.map((selectValue) => (
          <MenuItem value={selectValue.value}>{selectValue.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
