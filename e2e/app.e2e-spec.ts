import { PrjTwoPage } from './app.po';

describe('prj-two App', () => {
  let page: PrjTwoPage;

  beforeEach(() => {
    page = new PrjTwoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
