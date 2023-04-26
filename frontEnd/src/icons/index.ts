import { createIconSetFromIcoMoon } from '@expo/vector-icons';

export * from '@expo/vector-icons';

export const CustomIcons = createIconSetFromIcoMoon(
    require('./selection.json'),
    "IcoMoon",
    "icomoon.ttf"
);