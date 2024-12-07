import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ConstructionIcon from '@mui/icons-material/Construction';
import DiamondIcon from '@mui/icons-material/Diamond';
import PaidIcon from '@mui/icons-material/Paid';
import { IconButton, Typography } from '@mui/material';
import { useCallback } from 'react';
import {
  ECoinType,
  EHoardType,
  ETreasureType,
  ITreasureItem,
} from '../../interfaces/treasureItem.interface';
import { ESize } from '../../styles/size.enum';
import FlexBox from '../base-components/FlexBox';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { getRandomElementInArray } from '../utils/toolbox';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TreasureItemCard(props: {
  treasureItem: ITreasureItem;
  onRemoveItem?: () => void;
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

  const getRandomGemColor = useCallback((): string => {
    const gemColors: string[] = [
      '#E0115F', // Rubis
      '#0F52BA', // Saphir
      '#50C878', // Émeraude
      '#9966CC', // Améthyste
      '#E4D00A', // Citrine
      '#17202a', // Onyx
    ];
    return getRandomElementInArray(gemColors);
  }, []);

  const getItemIcon = useCallback(
    (item: ITreasureItem) => {
      switch (item.type) {
        case ETreasureType.COIN:
          return (
            <PaidIcon sx={{ color: getCoinColor(item.metaData?.coinType) }} />
          );
        case ETreasureType.HOARD:
          if (item.subType === EHoardType.ART_OBJECT.toString()) {
            return <ColorLensIcon />;
          }
          return <DiamondIcon sx={{ color: getRandomGemColor() }} />;
        case ETreasureType.MAGIC_OBJECT:
          return <AutoFixHighIcon />;
        case ETreasureType.RARE_OBJECT:
          return <ConstructionIcon />;
        default:
          return <></>;
      }
    },
    [getCoinColor, getRandomGemColor]
  );

  const getItemDisplayName = useCallback((item: ITreasureItem): string => {
    let finalString = item.name;
    if (item.price) {
      finalString += ` (${item.price})`;
    }
    if (item.metaData?.repartition) {
      finalString += ` ${item.metaData.repartition.toLowerCase()}`;
    }
    return finalString;
  }, []);

  return (
    <FlexBox
      flexDirection={'row'}
      gap={ESize.xs}
      border={1}
      padding={ESize.sm_small}
      alignItems={'center'}
    >
      {getItemIcon(treasureItem)}
      <Typography>{getItemDisplayName(treasureItem)}</Typography>
      {props.onRemoveItem && (
        <IconButton
          onClick={props.onRemoveItem}
          size="small"
          sx={{ marginLeft: 'auto' }}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </FlexBox>
  );
}
