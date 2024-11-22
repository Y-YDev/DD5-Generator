import { Box, BoxProps } from '@mui/material';
import { ESize } from '../styles/size.enum';

export default function FlexBox(props: BoxProps) {
  const { flexDirection, gap, padding, ...othersProps } = props;

  return (
    <Box
      display={'flex'}
      gap={gap ?? ESize.base}
      padding={padding ?? ESize.base}
      flexDirection={flexDirection ?? 'column'}
      {...othersProps}
    >
      {props.children}
    </Box>
  );
}
