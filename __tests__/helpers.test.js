const {format_date, format_plural, format_url } = require('../utils/helpers');


// Test the format_date function
test('format_date() returns a date string', () => {
    const date = new Date('2022-05-22 14:00:00');

    expect(format_date(date)).toBe('5/22/2022');
});

//  testing the shortening of URLs  to be set up later
test('format_url() returns a simplified url string', () => {
    const url1 = format_url('http://test.com/page/1');
    const url2 = format_url('https://www.coolstuff.com/abcdefg/');
    const url3 = format_url('https://www.google.com?q=hello');

    expect(url1).toBe('test.com');
    expect(url2).toBe('coolstuff.com');
    expect(url3).toBe('google.com');
});

// Test the format_plural function
test('format_plural() returns a pluralized word', () => {
    const plural = format_plural('cat', 2);
    const single = format_plural('dog', 1);

    expect(plural).toBe('cats');
    expect(single).toBe('dog');
}); 

