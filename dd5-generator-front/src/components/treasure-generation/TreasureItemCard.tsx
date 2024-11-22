import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ConstructionIcon from '@mui/icons-material/Construction';
import DiamondIcon from '@mui/icons-material/Diamond';
import PaidIcon from '@mui/icons-material/Paid';
import { Typography } from '@mui/material';
import { useCallback } from 'react';
import {
  ECoinType,
  ETreasureType,
  ITreasureItem,
} from '../../interfaces/treasureItem.interface';
import { ESize } from '../../styles/size.enum';
import FlexBox from '../base-components/FlexBox';

export default function TreasureItemCard(props: {
  treasureItem: ITreasureItem;
}) {
  const treasureItem = props.treasureItem;

  const getCoinColor = useCallback((coinType: ECoinType | undefined) => {
    if (coinType === undefined) return undefined;
    switch (coinType) {
      case ECoinType.PC:
        return 'SaddleBrown';
      case ECoinType.PA:
        return 'DarkGray';
      case ECoinType.PE:
        return 'SkyBlue';
      case ECoinType.PO:
        return 'Gold';
      case ECoinType.PP:
        return 'Gainsboro';
      default:
        return undefined;
    }
  }, []);

  const getItemIcon = useCallback(
    (item: ITreasureItem) => {
      switch (item.type) {
        case ETreasureType.COIN:
          return (
            <PaidIcon sx={{ color: getCoinColor(item.metaData?.coinType) }} />
          );
        case ETreasureType.INDIVIDUAL_TREASURE:
          return <DiamondIcon />;
        case ETreasureType.MAGIC_OBJECT:
          return <AutoFixHighIcon />;
        case ETreasureType.RARE_OBJECT:
          return <ConstructionIcon />;
        default:
          return <></>;
      }
    },
    [getCoinColor]
  );

  return (
    <FlexBox
      flexDirection={'row'}
      gap={ESize.xs}
      border={1}
      padding={ESize.sm_small}
    >
      {getItemIcon(treasureItem)}
      <Typography>{`${treasureItem.name} ${treasureItem.price ? `(${treasureItem.price})` : ''}`}</Typography>
    </FlexBox>
  );
}
