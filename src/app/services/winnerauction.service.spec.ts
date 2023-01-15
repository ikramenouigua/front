import { TestBed } from '@angular/core/testing';

import { WinnerauctionService } from './winnerauction.service';

describe('WinnerauctionService', () => {
  let service: WinnerauctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WinnerauctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
