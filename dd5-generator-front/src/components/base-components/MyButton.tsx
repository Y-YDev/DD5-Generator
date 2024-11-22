import { Button, ButtonProps } from '@mui/material';

export default function MyButton(props: ButtonProps) {
  return (
    <Button variant="contained" style={{ width: 'fit-content' }} {...props}>
      {props.children}
    </Button>
  );
}
