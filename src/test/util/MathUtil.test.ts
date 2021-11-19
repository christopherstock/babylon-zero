import * as bz from '../../typescript/bz';

describe( 'MathUtil', () =>
{
    it( 'gets the sinus from 90 degrees', () =>
    {
        const result:number = bz.MathUtil.sinDegrees( 90.0 );
        expect( result ).toEqual( 1.0 );
    });
});
