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
import MyButton from '../components/base-components/MyButton';
import api from '../api';
import { BACKEND_URL } from '../interfaces/constants';
import HoardCustomGenerationForm from '../components/treasure-generation/custom-generation/HoardCustomGenerationForm';
import MagicObjCustomGenerationForm from '../components/treasure-generation/custom-generation/MagicObjCustomGenerationForm';

export default function CustomTreasureGenPage() {
  const [itemType, setItemType] = useState<ETreasureType>(ETreasureType.COIN);
  const [itemList, setItemList] = useState<ITreasureItem[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);

  const onAddItemToList = useCallback((newItem: ITreasureItem) => {
    setError(undefined);
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

  const addRareItem = useCallback(async () => {
    const rareObj = await api
      .get<ITreasureItem>(`${BACKEND_URL}/treasure/rare-object/one`)
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message ?? err.message);
        return undefined;
      });
    if (rareObj) {
      onAddItemToList(rareObj.data);
    }
  }, [onAddItemToList]);

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
              { label: 'Hoard (Treasure)', value: ETreasureType.HOARD },
              { label: 'Magic object', value: ETreasureType.MAGIC_OBJECT },
            ]}
          />
          {itemType === ETreasureType.COIN && (
            <CoinCustomGenerationForm onAddCoin={onAddItemToList} />
          )}
          {itemType === ETreasureType.RARE_OBJECT && (
            <MyButton onClick={addRareItem}>Add rare item</MyButton>
          )}
          {itemType === ETreasureType.HOARD && (
            <HoardCustomGenerationForm
              onAddHoard={onAddItemToList}
              setError={setError}
            />
          )}
          {itemType === ETreasureType.MAGIC_OBJECT && (
            <MagicObjCustomGenerationForm
              onAddMagicObj={onAddItemToList}
              setError={setError}
            />
          )}
          {error && <Typography color="red">{error}</Typography>}
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
