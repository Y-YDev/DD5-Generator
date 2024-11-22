import { Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import FlexBox from '../components/FlexBox';
import MyButton from '../components/MyButton';
import { ITreasureItem } from '../interfaces/treasureItem.interface';

export function TreasureGenerationPage() {
  const navigate = useNavigate();

  const [generationData, setGenerationData] = useState<ITreasureItem[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateClick = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await api.get<ITreasureItem[]>(
        'http://localhost:3000/treasure'
      );
      setGenerationData(response.data);
    } catch (err: any) {
      console.log(err);

      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlexBox>
      <MyButton onClick={() => navigate('/')}>Back Home</MyButton>
      <Typography>TreasureGenerationPage</Typography>
      <MyButton onClick={handleGenerateClick}>Generate treasure</MyButton>
      {error && <Typography color="red">{error}</Typography>}
      <Typography>
        Data:
        {loading
          ? 'Loading...'
          : generationData.map((item) => item.name).join(', ')}
      </Typography>
    </FlexBox>
  );
}
