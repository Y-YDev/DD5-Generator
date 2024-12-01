import { TextField, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import api from '../../../api';
import { BACKEND_URL } from '../../../interfaces/constants';
import { ITreasureItem } from '../../../interfaces/treasureItem.interface';
import FlexBox from '../../base-components/FlexBox';
import MyButton from '../../base-components/MyButton';

export default function MagicObjCustomGenerationForm(props: {
  onAddMagicObj: (magicItem: ITreasureItem) => void;
  setError: (error: string) => void;
}) {
  const [magicRank, setMagicRank] = useState<number>(1);

  const onIndTreasureAdd = useCallback(async () => {
    const magicObject = await api
      .get<ITreasureItem>(`${BACKEND_URL}/treasure/magic-object/rank`, {
        params: { rank: magicRank },
      })
      .catch((err) => {
        console.log(err);
        props.setError(err.response.data.message ?? err.message);
        return undefined;
      });
    if (magicObject) {
      props.onAddMagicObj(magicObject.data);
    }
  }, [magicRank, props]);

  return (
    <FlexBox padding={0}>
      <Typography variant="body2" fontStyle={'italic'}>
        Magic rank must be between 1 and 8.
      </Typography>
      <TextField
        sx={{ width: 300 }}
        label="Encounter level"
        value={magicRank}
        onChange={(event) => setMagicRank(Number(event.target.value) ?? 1)}
        type="number"
      />
      <MyButton onClick={onIndTreasureAdd}>Add magic object</MyButton>
    </FlexBox>
  );
}
