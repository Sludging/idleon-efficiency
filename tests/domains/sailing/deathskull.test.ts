import { initArtifactRepo } from '../../../data/domain/data/ArtifactRepo';
import { Artifact, ArtifactStatus, DeathskullArtifact } from '../../../data/domain/world-5/sailing/artifacts';

describe('Sailing artifacts - Deathskull', () => {
  it('restores the Gallery Slot display and inherited numeric bonus', () => {
    const deathskull = Artifact.fromBase(initArtifactRepo()).find(artifact => artifact.index === 33);

    expect(deathskull).toBeInstanceOf(DeathskullArtifact);
    deathskull?.updateStatus(ArtifactStatus.Sovereign);

    expect(deathskull?.getBonus()).toBe(1);
    expect(deathskull?.getBonusText()).toBe('+1 Gallery Slot');
  });
});
