import { Box, BoxProps } from '@mui/material';
import { ESize } from '../../styles/size.enum';
import { useMemo } from 'react';

export default function FlexBox(
  props: BoxProps & { takeRemainingSpace?: boolean }
) {
  const { flexDirection, gap, padding, takeRemainingSpace, ...othersProps } =
    props;

  const autoAddedStyle = useMemo(() => {
    const styleAddition: any = {};
    if (takeRemainingSpace) {
      styleAddition['flex'] = 1;
      styleAddition['minHeight'] = 0;
    }
    return styleAddition;
  }, [takeRemainingSpace]);

  return (
    <Box
      display={'flex'}
      gap={gap ?? ESize.base}
      padding={padding ?? ESize.base}
      flexDirection={flexDirection ?? 'column'}
      {...autoAddedStyle}
      {...othersProps}
    >
      {props.children}
    </Box>
  );
}
