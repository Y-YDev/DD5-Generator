import { TextField, Typography } from '@mui/material';
import { useState } from 'react';
import api from '../api';
import FlexBox from '../components/base-components/FlexBox';
import MyButton from '../components/base-components/MyButton';
import TreasureItemCard from '../components/treasure-generation/TreasureItemCard';
import { ITreasureItem } from '../interfaces/treasureItem.interface';
import { ESize } from '../styles/size.enum';

export function TreasureGenerationPage() {
  const [encounterLvl, setEncounterLvl] = useState<string>();

  const [generationData, setGenerationData] = useState<ITreasureItem[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateClick = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await api.get<ITreasureItem[]>(
        'http://localhost:3000/treasure',
        {
          params: {
            encounterLevel: encounterLvl,
          },
        }
      );
      setGenerationData(response.data);
    } catch (err: any) {
      console.log(err);
      setGenerationData([]);
      setError(err.response.data.message ?? err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlexBox takeRemainingSpace>
      <Typography variant="h5">Treasure Generation</Typography>
      <Typography variant="body2" fontStyle={'italic'}>
        No encounter level given mean random level between 0 and 20
      </Typography>
      <TextField
        sx={{ width: 300 }}
        label="Encounter level"
        value={encounterLvl}
        onChange={(event) => setEncounterLvl(event.target.value)}
        type="number"
      />
      <MyButton onClick={handleGenerateClick}>Generate treasure</MyButton>
      {error && <Typography color="red">{error}</Typography>}
      {generationData.length > 0 && <Typography>Data:</Typography>}
      {loading && <Typography>Loading...</Typography>}
      <FlexBox
        gap={ESize.x2s}
        overflow={'auto'}
        width={500}
        flex={1}
        padding={0}
      >
        {generationData.map((item) => (
          <TreasureItemCard treasureItem={item} />
        ))}
      </FlexBox>
    </FlexBox>
  );
}
