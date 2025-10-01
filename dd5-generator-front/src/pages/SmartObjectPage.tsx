import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import FlexBox from '../components/base-components/FlexBox';
import { useCallback, useState } from 'react';
import { BACKEND_URL } from '../interfaces/constants';
import api from '../api';
import MyButton from '../components/base-components/MyButton';
import { EStatsType, ISmartObject } from '../interfaces/smartObject.interface';
import { ESize } from '../styles/size.enum';

export default function SmartObjectPage() {
  const [generationData, setGenerationData] = useState<
    ISmartObject | undefined
  >(undefined);
  const [addParticularity, setAddParticularity] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateClick = useCallback(async () => {
    setGenerationData(undefined);
    setLoading(true);
    setError(null); // Reset error state
    try {
      const response = await api.get<ISmartObject>(
        `${BACKEND_URL}/smart-object/smart-object`,
        { params: { addParticularity: addParticularity } }
      );
      setGenerationData(response.data);
    } catch (err: any) {
      console.log(err);
      setGenerationData(undefined);
      setError(err.response.data.message ?? err.message);
    } finally {
      setLoading(false);
    }
  }, [addParticularity]);

  const findStatValue = useCallback(
    (type: EStatsType): number | undefined => {
      return generationData?.stats.find((stat) => stat.type === type)?.value;
    },
    [generationData]
  );

  return (
    <FlexBox takeRemainingSpace>
      <Typography variant="h5">{'Smart Object Generation'}</Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={addParticularity}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAddParticularity(event.target.checked);
            }}
          />
        }
        label="Add particularity (fun facts and additional properties)"
      />
      <MyButton onClick={handleGenerateClick}>Generate smart object</MyButton>
      {error && <Typography color="red">{error}</Typography>}
      {loading && <Typography>Loading...</Typography>}
      {generationData && (
        <FlexBox padding={0}>
          <FlexBox padding={0}>
            <Typography variant="h6">
              Name: {generationData.name} ({generationData.alignment})
            </Typography>
            <FlexBox
              padding={0}
              paddingBottom={ESize.base}
              gap={ESize.base}
              flexDirection="row"
            >
              <Typography>
                <strong>INT:</strong> {findStatValue(EStatsType.INT)}
              </Typography>
              <Typography>
                <strong>WIS:</strong> {findStatValue(EStatsType.WIS)}
              </Typography>
              <Typography>
                <strong>CHA:</strong> {findStatValue(EStatsType.CHA)}
              </Typography>
            </FlexBox>
            <Typography>
              <strong>Communication: </strong>
              {generationData.communication}
            </Typography>
            <Typography>
              <strong>Senses: </strong>
              {generationData.sense}
            </Typography>
            <Typography>
              <strong>Special Purpose: </strong>
              {generationData.specialPurpose}
            </Typography>
            {generationData.funFacts && (
              <Typography>
                <strong>Fun Facts: </strong>
                {generationData.funFacts}
              </Typography>
            )}
            {generationData.additionalParticularity && (
              <Typography>
                <strong>Additional Particularity: </strong>
                {generationData.additionalParticularity}
              </Typography>
            )}
          </FlexBox>

          <FlexBox padding={0} marginTop={ESize.base}>
            <Typography variant="h6">Potential Conflict</Typography>
            <Typography variant="subtitle1" style={{ fontStyle: 'italic' }}>
              An intelligent object has free will, shaped by its personality and
              alignment. If its user acts in a manner contrary to the object's
              alignment or purpose, a conflict may arise. In this case, the
              object makes a Charisma check opposed to the user's Charisma
              check. If the object wins the opposition, it imposes a
              requirement:
            </Typography>
            <Typography>
              <strong>Requirements: </strong>
              {generationData.conflict.requirements}
            </Typography>
            <Typography variant="subtitle1" style={{ fontStyle: 'italic' }}>
              If its user refuses to obey the object's commands, the object may
              do:
            </Typography>
            <Typography>
              <strong>Punishment: </strong>
              {generationData.conflict.punishment}
            </Typography>
            <Typography variant="subtitle1" style={{ fontStyle: 'italic' }}>
              If a smart object attempts to take control of its user, the user
              must make a Charisma saving throw against the object's Charisma
              DD. If the saving throw fails, the user is charmed by the object
              for several hours. The charmed user must attempt to follow the
              object's orders. If they take damage, they can retry the saving
              throw and end the effect if they succeed. The object cannot be
              used again until the next dawn, regardless of whether the user's
              attempt to control it was successful or not.
            </Typography>
            <FlexBox
              padding={0}
              paddingBottom={ESize.base}
              gap={ESize.base}
              flexDirection="row"
            >
              <Typography>
                <strong>DD:</strong> {generationData.conflict.charmDifficulty}
              </Typography>
              <Typography>
                <strong>Duration:</strong> {generationData.conflict.charmTime}h
              </Typography>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      )}
    </FlexBox>
  );
}
