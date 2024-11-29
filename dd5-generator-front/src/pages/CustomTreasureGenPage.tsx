import { Divider, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import FlexBox from '../components/base-components/FlexBox';
import MySelect from '../components/base-components/MySelect';
import CoinCustomGenerationForm from '../components/treasure-generation/custom-generation/CoinCustomGenerationForm';
import {
  ETreasureType,
  ITreasureItem,
} from '../interfaces/treasureItem.interface';
import TreasureItemCard from '../components/treasure-generation/TreasureItemCard';
import _ from 'lodash';
import { ESize } from '../styles/size.enum';
import { extractNumberFromCoin } from '../components/utils/treasureGenUtils';

export default function CustomTreasureGenPage() {
  const [itemType, setItemType] = useState<ETreasureType>(ETreasureType.COIN);
  const [itemList, setItemList] = useState<ITreasureItem[]>([]);

  const onAddItemToList = useCallback((newItem: ITreasureItem) => {
    setItemList((oldList) => {
      const newList = _.cloneDeep(oldList);

      if (newItem.type === ETreasureType.COIN) {
        const coinInList = newList.find(
          (item) => item.metaData?.coinType === newItem.metaData?.coinType
        );
        if (coinInList) {
          const oldCoinValue = extractNumberFromCoin(coinInList.name) ?? 0;
          const newCoinValue = extractNumberFromCoin(newItem.name) ?? 0;
          coinInList.name = `${oldCoinValue + newCoinValue} ${newItem.metaData?.coinType?.toLowerCase()}`;
        } else {
          newList.push(newItem);
        }
        return newList;
      }

      newList.push(newItem);
      return newList;
    });
  }, []);

  const onRemoveItem = useCallback((itemIndex: number) => {
    setItemList((oldList) => {
      const newList = _.cloneDeep(oldList);
      newList.splice(itemIndex, 1);
      return newList;
    });
  }, []);

  return (
    <FlexBox takeRemainingSpace>
      <Typography variant="h5">{'Custom treasure generation'}</Typography>

      <FlexBox flexDirection={'row'} gap={0} padding={0} takeRemainingSpace>
        <FlexBox takeRemainingSpace>
          <MySelect<ETreasureType>
            setValue={setItemType}
            value={itemType}
            title={'Item type'}
            selectValues={[
              { label: 'Coin', value: ETreasureType.COIN },
              { label: 'Rare object', value: ETreasureType.RARE_OBJECT },
              { label: 'Individual', value: ETreasureType.INDIVIDUAL_TREASURE },
              { label: 'Magic object', value: ETreasureType.MAGIC_OBJECT },
            ]}
          />
          {itemType === ETreasureType.COIN && (
            <CoinCustomGenerationForm onAddCoin={onAddItemToList} />
          )}
        </FlexBox>
        <Divider orientation="vertical" />
        <FlexBox takeRemainingSpace gap={ESize.xs}>
          <Typography variant="h6">{'Treasure:'}</Typography>
          <Typography variant="body2" fontStyle={'italic'}>
            Add item by type to build your own treasure
          </Typography>
          <FlexBox
            gap={ESize.x2s}
            overflow={'auto'}
            width={500}
            takeRemainingSpace
            padding={0}
            paddingRight={ESize.base}
          >
            {itemList.map((item, index) => (
              <TreasureItemCard
                key={index}
                treasureItem={item}
                onRemoveItem={() => onRemoveItem(index)}
              />
            ))}
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
