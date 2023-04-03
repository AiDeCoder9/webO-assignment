import { MonsterImage, RaceImage, SpellImage } from '@/assets/image';

const getHeaderImage = (type: 'spells' | 'monsters' | 'races') => {
  switch (type) {
    case 'spells':
      return SpellImage;
    case 'monsters':
      return MonsterImage;
    case 'races':
      return RaceImage;
    default:
      return SpellImage;
  }
};

export { getHeaderImage };
