import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import api from '../api';
import FlexBox from '../components/base-components/FlexBox';
import MyButton from '../components/base-components/MyButton';
import { NAME_GENERATOR_API_URL } from '../interfaces/constants';

export default function SmartObjectGenPage() {
  const [generationData, setGenerationData] = useState<string | undefined>(
    undefined
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [ancestries, setAncestries] = useState<string>('h');
  const [gender, setGender] = useState<string>('m');

  const handleAncestryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAncestries((event.target as HTMLInputElement).value);
  };
  const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value);
  };

  const handleGenerateClick = useCallback(async () => {
    setGenerationData(undefined);
    setLoading(true);
    setError(null); // Reset error state
    console.log(ancestries, gender);
    try {
      const response = await api.get<string>(`${NAME_GENERATOR_API_URL}`, {
        params: { ancestry: ancestries, gender: gender, family: 't' },
      });
      setGenerationData(response.data);
    } catch (err: any) {
      console.log(err);
      setGenerationData(undefined);
      setError(err.response.data.message ?? err.message);
    } finally {
      setLoading(false);
    }
  }, [ancestries, gender]);

  return (
    <FlexBox takeRemainingSpace>
      <Typography variant="h5">{'Name Generation'}</Typography>
      <Typography variant="subtitle2" style={{ fontStyle: 'italic' }}>
        See{' '}
        <a href="https://fantasyname.lukewh.com/help">
          https://fantasyname.lukewh.com/help
        </a>{' '}
        for help
      </Typography>

      <FormControl>
        <FormLabel id="ancestries">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="ancestries"
          onChange={handleAncestryChange}
          value={ancestries}
        >
          <FormControlLabel value="h" control={<Radio />} label="Human" />
          <FormControlLabel value="d" control={<Radio />} label="Dwarf" />
          <FormControlLabel value="e" control={<Radio />} label="Elf" />
          <FormControlLabel value="o" control={<Radio />} label="Ork" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id="gender">Gender</FormLabel>
        <RadioGroup
          row
          aria-labelledby="gender"
          onChange={handleGenderChange}
          value={gender}
        >
          <FormControlLabel value="m" control={<Radio />} label="Male" />
          <FormControlLabel value="f" control={<Radio />} label="Female" />
        </RadioGroup>
      </FormControl>
      <MyButton onClick={handleGenerateClick}>Generate name</MyButton>
      {error && <Typography color="red">{error}</Typography>}
      {loading && <Typography>Loading...</Typography>}
      {generationData && (
        <FlexBox padding={0}>
          <Typography variant="h6">Name: {generationData}</Typography>
        </FlexBox>
      )}
    </FlexBox>
  );
}
