import { TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import {
  ECoinType,
  ETreasureType,
  ITreasureItem,
} from '../../../interfaces/treasureItem.interface';
import MySelect from '../../base-components/MySelect';
import FlexBox from '../../base-components/FlexBox';
import MyButton from '../../base-components/MyButton';
import { isStringEmptyOfUndef } from '../../utils/toolbox';

export default function CoinCustomGenerationForm(props: {
  onAddCoin: (coinItem: ITreasureItem) => void;
}) {
  const [coinQuantity, setCoinQuantity] = useState<string>();
  const [coinType, setCoinType] = useState<ECoinType>(ECoinType.PO);

  const onCoinAdd = useCallback(() => {
    if (isStringEmptyOfUndef(coinQuantity)) return;
    if (Number(coinQuantity) <= 0) return;
    props.onAddCoin({
      name: `${coinQuantity} ${coinType.toLowerCase()}`,
      type: ETreasureType.COIN,
      metaData: { coinType: coinType },
    });
  }, [coinQuantity, coinType, props]);

  return (
    <FlexBox padding={0}>
      <FlexBox flexDirection={'row'} padding={0}>
        <TextField
          sx={{ width: 300 }}
          label="Coin"
          value={coinQuantity}
          onChange={(event) => setCoinQuantity(event.target.value)}
          type="number"
        />
        <MySelect<ECoinType>
          setValue={setCoinType}
          value={coinType}
          title={'Coin type'}
          selectValues={[
            { label: 'PC', value: ECoinType.PC },
            { label: 'PA', value: ECoinType.PA },
            { label: 'PE', value: ECoinType.PE },
            { label: 'PO', value: ECoinType.PO },
            { label: 'PP', value: ECoinType.PP },
          ]}
        />
      </FlexBox>
      <MyButton onClick={onCoinAdd}>Add coins</MyButton>
    </FlexBox>
  );
}
