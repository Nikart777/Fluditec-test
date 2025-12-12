// Цвета для JS-логики
export const BRAND_COLORS = {
  purple: '#594BDB',
  yellow: '#FEEE31',
  teal: '#00adae',
  dark: '#1a1a1a',
  gray: '#f4f4f4'
};

export const NAV_LINKS = [
  { id: 1, title: 'Для врачей', href: '/doctors' },
  { id: 2, title: 'Частые вопросы', href: '/faq' },
  { id: 3, title: 'Формы', href: '/forms' },
];

export const HERO_PRODUCTS = [
  {
    id: 'adults-sachet',
    title: 'ФЛЮДИТЕК',
    subtitle: 'РАСТВОР в сашÉ',
    age: '15+',
    color: BRAND_COLORS.purple,
    textColor: 'text-white',
    description: 'Облегчает кашель и заложенность носа, разжижает мокроту.',
    instructionLink: '/upload/instruction_adult_sachet.pdf',
    image: 'https://fluditec.ru/upload/iblock/12f/66q29fongvlm2kac38kgzc95i0s59mow.png', // Саше
    variant: 'purple'
  },
  {
    id: 'kids-syrup',
    title: 'ФЛЮДИТЕК',
    subtitle: 'Сироп для детей',
    age: '2+',
    color: BRAND_COLORS.yellow,
    textColor: 'text-gray-900',
    description: 'Приятный банановый вкус. Лечит кашель бережно.',
    instructionLink: '/upload/instruction_kids.pdf',
    image: 'https://fluditec.ru/upload/iblock/89b/qo6qv8w7t96q0nvqnuhavvai7adt16sc.png', // Сироп детский
    variant: 'yellow'
  },
  {
    id: 'adults-syrup',
    title: 'ФЛЮДИТЕК',
    subtitle: 'Сироп',
    age: '15+',
    color: BRAND_COLORS.teal,
    textColor: 'text-white',
    description: 'Действует на всем протяжении дыхательных путей.',
    instructionLink: '/upload/instruction_adult_syrup.pdf',
    image: 'https://fluditec.ru/upload/iblock/cc9/c3v3t1w09rsbf6egwl8gkd64wef0utcf.png', // Сироп взрослый
    variant: 'teal'
  }
];