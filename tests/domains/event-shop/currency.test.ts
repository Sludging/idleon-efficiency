import { EventShop } from '../../../data/domain/eventShop';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
const saveName = 'latest';

describe('Event Shop - star balance', () => {
    let eventShop: EventShop;

    beforeAll(() => {
        eventShop = loadGameDataFromSave(saveName).get('eventShop') as EventShop;
    });

    it('matches the saved event-star balance without mixing other star currencies', () => {
        const accountOptions = loadTestSave(saveName).get('OptLacc') as (number | string)[];
        const savedStars = Number(accountOptions[310] ?? 0);

        expect(eventShop.starsOwned).toMatchLiveGameWithDetails(savedStars, {
            tolerance: 0,
            context: 'Event Shop Stars available in the genuine account save',
        });
    });
});
