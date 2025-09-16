import { Typography, TextField, FormControlLabel } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import api from '../../api';
import { BACKEND_URL } from '../../interfaces/constants';
import { ITreasureItem } from '../../interfaces/treasureItem.interface';
import { ESize } from '../../styles/size.enum';
import FlexBox from '../base-components/FlexBox';
import MyButton from '../base-components/MyButton';
import TreasureItemCard from './TreasureItemCard';
import Checkbox from '@mui/material/Checkbox';

export default function TreasureGenerationComponent(props: {
  title: string;
  buttonLabel: string;
  backendPath?: string;
}) {
  const [encounterLvl, setEncounterLvl] = useState<string>();
  const [monsterNb, setMonsterNb] = useState<string>();
  const [addHoardBonus, setHoardBonus] = useState<boolean>(false);

  const [generationData, setGenerationData] = useState<
    ITreasureItem[] | undefined
  >(undefined);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const shouldShowMonsterNbOption = useMemo(() => {
    return !props.backendPath || props.backendPath === 'coin';
  }, [props.backendPath]);

  const shouldShowHoardOption = useMemo(() => {
    return !props.backendPath || props.backendPath === 'hoard';
  }, [props.backendPath]);

  // To empty the list when changing tab
  useEffect(() => {
    setGenerationData(undefined);
  }, [props.title]);

  const handleGenerateClick = useCallback(async () => {
    setGenerationData(undefined);
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await api.get<ITreasureItem[]>(
        `${BACKEND_URL}/treasure/${props.backendPath ?? ''}`,
        {
          params: {
            encounterLevel: encounterLvl,
            monsterNumber: monsterNb,
            hoardBonus: addHoardBonus,
          },
        }
      );
      setGenerationData(response.data);
    } catch (err: any) {
      console.log(err);
      setGenerationData(undefined);
      setError(err.response.data.message ?? err.message);
    } finally {
      setLoading(false);
    }
  }, [addHoardBonus, encounterLvl, monsterNb, props.backendPath]);

  return (
    <FlexBox takeRemainingSpace>
      <Typography variant="h5">{props.title}</Typography>
      <FlexBox gap={1} padding={0}>
        <Typography variant="body2" fontStyle={'italic'}>
          No encounter level given mean random level between 0 and 20
        </Typography>
        {shouldShowMonsterNbOption && (
          <Typography variant="body2" fontStyle={'italic'}>
            Monster number help in coin generation. No value implies generic
            distribution.
          </Typography>
        )}
        {shouldShowHoardOption && (
          <Typography variant="body2" fontStyle={'italic'}>
            Creatures with a reputation for amassing real fortunes (like
            dragons) can have two or three times the value given for the bonus.
          </Typography>
        )}
      </FlexBox>
      <FlexBox flexDirection={'row'} padding={0}>
        <TextField
          sx={{ width: 300 }}
          label="Encounter level"
          value={encounterLvl}
          onChange={(event) => setEncounterLvl(event.target.value)}
          type="number"
        />
        {shouldShowMonsterNbOption && (
          <TextField
            sx={{ width: 300 }}
            label="Monster number"
            value={monsterNb}
            onChange={(event) => setMonsterNb(event.target.value)}
            type="number"
          />
        )}
        {shouldShowHoardOption && (
          <FormControlLabel
            control={
              <Checkbox
                checked={addHoardBonus}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setHoardBonus(event.target.checked);
                }}
              />
            }
            label="Add hoard bonus (Coin)"
          />
        )}
      </FlexBox>
      <MyButton onClick={handleGenerateClick}>{props.buttonLabel}</MyButton>
      {error && <Typography color="red">{error}</Typography>}
      {loading && <Typography>Loading...</Typography>}
      {generationData && (
        <>
          <Typography>Data:</Typography>
          <FlexBox
            gap={ESize.x2s}
            overflow={'auto'}
            width={500}
            takeRemainingSpace
            padding={0}
            paddingRight={ESize.base}
          >
            {generationData.length > 0 ? (
              generationData.map((item, index) => (
                <TreasureItemCard key={index} treasureItem={item} />
              ))
            ) : (
              <Typography variant="body1">Empty</Typography>
            )}
          </FlexBox>
        </>
      )}
    </FlexBox>
  );
}
