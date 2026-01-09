import { Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import api from '../api';
import FlexBox from '../components/base-components/FlexBox';
import MyButton from '../components/base-components/MyButton';
import { BACKEND_URL } from '../interfaces/constants';
import DungeonDigger from '../components/godot/DungeonDigger';

export default function ScrollIncidentGenPage() {
  const [generationData, setGenerationData] = useState<string | undefined>(
    undefined
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateClick = useCallback(async () => {
    setGenerationData(undefined);
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await api.get<string>(
        `${BACKEND_URL}/miscellaneous/scroll-incident`
      );
      setGenerationData(response.data);
    } catch (err: any) {
      console.log(err);
      setGenerationData(undefined);
      setError(err.response.data.message ?? err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <FlexBox takeRemainingSpace>
      <Typography variant="h5">Scroll incident generation</Typography>
      <MyButton onClick={handleGenerateClick}>
        Generate scroll incident
      </MyButton>
      {error && <Typography color="red">{error}</Typography>}
      {loading && <Typography>Loading...</Typography>}
      {generationData && <Typography>{generationData}</Typography>}
    </FlexBox>
  );
}
