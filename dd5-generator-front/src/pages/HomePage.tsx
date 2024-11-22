import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FlexBox from '../components/FlexBox';
import MyButton from '../components/MyButton';

export function HomePage() {
  const navigate = useNavigate();

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
      <MyButton onClick={() => navigate('/treasure-generation')}>
        Treasure Generation
      </MyButton>
    </FlexBox>
  );
}
