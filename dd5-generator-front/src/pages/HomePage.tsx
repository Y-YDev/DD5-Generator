import { Typography } from '@mui/material';
import FlexBox from '../components/base-components/FlexBox';

export function HomePage() {
  return (
    <FlexBox>
      <img
        src="/pictures/logo.png"
        alt="DD5 generator logo"
        style={{ width: 500 }}
      />
      <Typography>
        This application is a treasure generation tool for Dungeon and Dragon
        5th edition.
      </Typography>
      <Typography>
        Treasure generation is based on the following website:
        https://5e-drs.fr/les-tresors/ and on the Dungeon master's Guide (FR
        version)
      </Typography>
    </FlexBox>
  );
}
