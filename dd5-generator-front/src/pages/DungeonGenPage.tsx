import { Link, Typography } from '@mui/material';
import FlexBox from '../components/base-components/FlexBox';
import DungeonDigger from '../components/godot/DungeonDigger';
import { ESize } from '../styles/size.enum';

export default function DungeonGenPage() {
  return (
    <FlexBox takeRemainingSpace gap={ESize.xs} padding={0}>
      <Typography variant="h5">Dungeon generator</Typography>

      <FlexBox takeRemainingSpace gap={ESize.xs} padding={0} overflow={'auto'}>
        <FlexBox flexDirection={'row'} padding={0}>
          <Typography variant="subtitle2" fontStyle="italic">
            This generator comes from my personal project{' '}
            <Link
              href="https://github.com/YannMartinDes/DungeonDigger"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontStyle: 'italic' }}
            >
              Dungeon Digger
            </Link>{' '}
            made with Godot Engine.
          </Typography>
        </FlexBox>
        <FlexBox padding={0}>
          <DungeonDigger />
        </FlexBox>
        <Typography variant="subtitle1">
          Regenerate the dungeon either by pressing Enter, Space or clicking the
          Generate Dungeon button.
        </Typography>
        <Typography variant="h6">Parameters</Typography>

        <Typography variant="subtitle2">
          - Number of steps: controls how many steps the digger takes.
        </Typography>
        <Typography variant="subtitle2">
          - Steps before turning: how many steps the digger takes before
          changing direction.
        </Typography>
        <Typography variant="subtitle2">
          - Chance to turn: the % of chance to turn at any step.
        </Typography>
        <Typography variant="subtitle2">
          - Room size: minimum and maximum size of rooms generated.
        </Typography>
      </FlexBox>
    </FlexBox>
  );
}
