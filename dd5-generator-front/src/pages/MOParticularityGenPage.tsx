import { Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import api from '../api';
import FlexBox from '../components/base-components/FlexBox';
import MyButton from '../components/base-components/MyButton';
import { BACKEND_URL } from '../interfaces/constants';
import { IMagicObjectParticularity } from '../interfaces/smartObject.interface';

export default function MOParticularityGenPage() {
  const [generationData, setGenerationData] = useState<
    IMagicObjectParticularity | undefined
  >(undefined);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateClick = useCallback(async () => {
    setGenerationData(undefined);
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await api.get<IMagicObjectParticularity>(
        `${BACKEND_URL}/smart-object/particularity`
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
      <Typography variant="h5">
        {'Magic Object Particularity Generation'}
      </Typography>
      <MyButton onClick={handleGenerateClick}>
        Generate magic object particularity
      </MyButton>
      {error && <Typography color="red">{error}</Typography>}
      {loading && <Typography>Loading...</Typography>}
      {generationData && (
        <FlexBox padding={0}>
          <Typography>
            <strong>Fun Facts: </strong>
            {generationData.funFacts}
          </Typography>
          <Typography>
            <strong>Additional Particularity: </strong>
            {generationData.additionalParticularity}
          </Typography>
        </FlexBox>
      )}
    </FlexBox>
  );
}
