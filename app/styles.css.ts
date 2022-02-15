import { createTheme, style } from '@vanilla-extract/css';

export const [ themeClass, vars ] = createTheme({
    color: {
        brand: 'hsl(30deg 100% 50%)',
    },
    font: {
        body: 'courier',
    },
});

export const exampleStyle = style({
    backgroundColor: vars.color.brand,
    fontFamily: vars.font.body,
    color: 'white',
    padding: 10,
});