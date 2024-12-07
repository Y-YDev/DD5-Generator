import { useCallback, useEffect, useMemo, useState } from 'react';
import api from '../../../api';
import { BACKEND_URL } from '../../../interfaces/constants';
import {
  EHoardType,
  ITreasureItem,
} from '../../../interfaces/treasureItem.interface';
import FlexBox from '../../base-components/FlexBox';
import MyButton from '../../base-components/MyButton';
import MySelect from '../../base-components/MySelect';

export default function HoardCustomGenerationForm(props: {
  onAddHoard: (hoardItem: ITreasureItem) => void;
  setError: (error: string) => void;
}) {
  const [hoardPrice, setHoardPrice] = useState<string>('10 po');
  const [hoardType, setHoardType] = useState<EHoardType>(EHoardType.GEMS);

  const pricePossibleValues = useMemo(() => {
    if (hoardType === EHoardType.GEMS) {
      return [
        { label: '10 po', value: '10 po' },
        { label: '50 po', value: '50 po' },
        { label: '100 po', value: '100 po' },
        { label: '500 po', value: '500 po' },
        { label: '1000 po', value: '1000 po' },
        { label: '5000 po', value: '5000 po' },
      ];
    } else {
      return [
        { label: '25 po', value: '25 po' },
        { label: '250 po', value: '250 po' },
        { label: '750 po', value: '750 po' },
        { label: '2500 po', value: '2500 po' },
        { label: '7500 po', value: '7500 po' },
      ];
    }
  }, [hoardType]);

  useEffect(() => {
    setHoardPrice(pricePossibleValues[0].value);
  }, [pricePossibleValues]);

  const onHoardAdd = useCallback(async () => {
    const hoard = await api
      .get<ITreasureItem>(`${BACKEND_URL}/treasure/hoard/one`, {
        params: { type: hoardType, price: hoardPrice },
      })
      .catch((err) => {
        console.log(err);
        props.setError(err.response.data.message ?? err.message);
        return undefined;
      });
    if (hoard) {
      props.onAddHoard(hoard.data);
    }
  }, [hoardPrice, hoardType, props]);

  return (
    <FlexBox padding={0}>
      <FlexBox flexDirection={'row'} padding={0}>
        <MySelect<EHoardType>
          setValue={setHoardType}
          value={hoardType}
          title={'Hoard type'}
          selectValues={[
            { label: 'Gems', value: EHoardType.GEMS },
            { label: 'Art object', value: EHoardType.ART_OBJECT },
          ]}
        />
        <MySelect<string>
          setValue={setHoardPrice}
          value={hoardPrice}
          title={'Hoard price'}
          selectValues={pricePossibleValues}
        />
      </FlexBox>
      <MyButton onClick={onHoardAdd}>Add hoard</MyButton>
    </FlexBox>
  );
}
