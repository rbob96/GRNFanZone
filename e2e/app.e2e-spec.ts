import { GRNFanZonePage } from './app.po';

describe('grnfan-zone App', function() {
  let page: GRNFanZonePage;

  beforeEach(() => {
    page = new GRNFanZonePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
