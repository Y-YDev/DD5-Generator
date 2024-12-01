import { useCallback, useEffect, useMemo, useState } from 'react';
import api from '../../../api';
import { BACKEND_URL } from '../../../interfaces/constants';
import {
  EIndividualTreasureType,
  ITreasureItem,
} from '../../../interfaces/treasureItem.interface';
import FlexBox from '../../base-components/FlexBox';
import MyButton from '../../base-components/MyButton';
import MySelect from '../../base-components/MySelect';

export default function IndTreasureCustomGenerationForm(props: {
  onAddInTreasure: (indTreasureItem: ITreasureItem) => void;
  setError: (error: string) => void;
}) {
  const [indTreasurePrice, setIndTreasurePrice] = useState<string>('10 po');
  const [indTreasureType, setIndTreasureType] =
    useState<EIndividualTreasureType>(EIndividualTreasureType.GEMS);

  const pricePossibleValues = useMemo(() => {
    if (indTreasureType === EIndividualTreasureType.GEMS) {
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
  }, [indTreasureType]);

  useEffect(() => {
    setIndTreasurePrice(pricePossibleValues[0].value);
  }, [pricePossibleValues]);

  const onIndTreasureAdd = useCallback(async () => {
    const indTreasure = await api
      .get<ITreasureItem>(`${BACKEND_URL}/treasure/individual-treasure/one`, {
        params: { type: indTreasureType, price: indTreasurePrice },
      })
      .catch((err) => {
        console.log(err);
        props.setError(err.response.data.message ?? err.message);
        return undefined;
      });
    if (indTreasure) {
      props.onAddInTreasure(indTreasure.data);
    }
  }, [indTreasurePrice, indTreasureType, props]);

  return (
    <FlexBox padding={0}>
      <FlexBox flexDirection={'row'} padding={0}>
        <MySelect<EIndividualTreasureType>
          setValue={setIndTreasureType}
          value={indTreasureType}
          title={'Individual treasure type'}
          selectValues={[
            { label: 'Gems', value: EIndividualTreasureType.GEMS },
            { label: 'Art object', value: EIndividualTreasureType.ART_OBJECT },
          ]}
        />
        <MySelect<string>
          setValue={setIndTreasurePrice}
          value={indTreasurePrice}
          title={'Individual treasure price'}
          selectValues={pricePossibleValues}
        />
      </FlexBox>
      <MyButton onClick={onIndTreasureAdd}>Add individual treasure</MyButton>
    </FlexBox>
  );
}
