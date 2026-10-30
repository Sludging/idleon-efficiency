import { initLibraryMetadataRepo } from '../../../../data/domain/data/LibraryMetadataRepo';
import { initRandoListRepo } from '../../../../data/domain/data/RandoListRepo';
import { Player } from '../../../../data/domain/player';
import { Construction } from '../../../../data/domain/world-3/construction/construction';
import { loadGameDataFromSave } from '../../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../../utils/target-player';

const resultFile = 'library-book-level-data.json';

describe('Library book levels', () => {
  const results = loadExtractionResults(resultFile);
  let player: Player;
  let library: Construction['library'];

  beforeAll(() => {
    validateExtractionHealth(results);
    const data = loadGameDataFromSave('latest');
    player = getTargetPlayer(data.get('players') as Player[]);
    library = (data.get('construction') as Construction).library;
  });

  it('matches the account maximum book level', () => {
    expect(library.maximumBookLevel).toMatchLiveGameWithDetails(getExtractedValue(results, 'maximum_book_level'), {
      tolerance: 0,
      context: 'Library maximum learned level',
    });
  });

  it('matches VIP membership', () => {
    expect(library.vipMembership).toMatchLiveGameWithDetails(getExtractedValue(results, 'vip_membership'), {
      tolerance: 0,
      context: 'Library VIP membership percentage',
    });
  });

  it('matches captured learned caps and allocated points for the selected character', () => {
    const caps = results.extractions.saved_talent_caps.result as number[];
    const points = results.extractions.saved_talent_points.result as number[];
    expect(Array.isArray(caps)).toBe(true);
    expect(Array.isArray(points)).toBe(true);
    for (const talent of player.talents) {
      // Game 1.24 saves only positive caps; its -1 unlearned sentinel is absent from the save.
      // See idleon1.24.txt:145773-145784. The website reads an absent saved cap as zero.
      const savedCap = caps[talent.skillIndex] === -1 ? 0 : caps[talent.skillIndex];
      expect(talent.bookMaxLevel).toMatchLiveGameWithDetails(savedCap, {
        tolerance: 0,
        context: `Saved learned cap for ${talent.name}`,
      });
      expect(talent.pointsSpent).toMatchLiveGameWithDetails(points[talent.skillIndex] ?? 0, {
        tolerance: 0,
        context: `Allocated points for ${talent.name}`,
      });
    }
  });

  it('offers the account ceiling for a normal Beginner talent', () => {
    const talent = player.getTalent(0)!;
    expect(talent.libraryMaxLevel).toMatchLiveGameWithDetails(getExtractedValue(results, 'maximum_book_level'), {
      tolerance: 0,
      context: 'Health Booster Library book ceiling',
    });
  });

  it('offers the current class page selected by the native Library', () => {
    const page = results.extractions.current_class_page.result as {
      classId: number;
      className: string;
      skills: number[];
    };
    expect(player.classId).toBe(page.classId);
    // Game 1.24 removes the current class from the skipped pages before navigation.
    // See idleon1.24.txt:198393-198402 and 194787-194805.
    for (const skill of page.skills) {
      const talent = player.getTalent(skill);
      expect(talent).toBeDefined();
      expect(talent!.libraryMaxLevel).toMatchLiveGameWithDetails(getExtractedValue(results, 'maximum_book_level'), {
        tolerance: 0,
        context: `Current class ${page.className} talent ${skill}`,
      });
    }
  });

  it('excludes blacklisted talents on the character pages', () => {
    const blacklist = new Set(initRandoListRepo()[16].data.elements.map(Number));
    const excluded = player.talents.filter(talent => blacklist.has(talent.skillIndex));
    for (const talent of excluded) {
      expect(talent.libraryMaxLevel).toBeUndefined();
    }
  });

  it('offers VIP talents at their membership thresholds, including unlearned talents', () => {
    const maximum = getExtractedValue(results, 'maximum_book_level');
    const membership = getExtractedValue(results, 'vip_membership');
    for (const entry of initLibraryMetadataRepo()[0].data.vipTalents) {
      const talent = player.getTalent(entry.skillIndex)!;
      if (membership >= entry.requiredMembership) {
        expect(talent.libraryMaxLevel).toMatchLiveGameWithDetails(maximum, {
          tolerance: 0,
          context: `VIP Library ceiling for ${talent.name}`,
        });
      } else {
        expect(talent.libraryMaxLevel).toBeUndefined();
      }
    }
  });
});
