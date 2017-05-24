import { AMIPage } from './app.po';

describe('ami App', () => {
  let page: AMIPage;

  beforeEach(() => {
    page = new AMIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
