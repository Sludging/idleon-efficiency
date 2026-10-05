const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_LOCAL_SAVE_FILE = 'tests/fixtures/saves/latest.json';
const ALLOWED_SAVE_ROOTS = ['tests/fixtures/saves', 'profiles'];

function selectLocalSave({ projectRoot, nodeEnv, appStage, localSaveFile, getLocalSaveFile }) {
  if (nodeEnv !== 'development' || appStage !== 'local') {
    return undefined;
  }

  const selected = (getLocalSaveFile ? getLocalSaveFile() : localSaveFile) || DEFAULT_LOCAL_SAVE_FILE;
  const absolutePath = path.resolve(projectRoot, selected);
  let realPath;
  try {
    realPath = fs.realpathSync(absolutePath);
  } catch {
    throw new Error(`Invalid LOCAL_SAVE_FILE "${selected}": file does not exist`);
  }

  const realRoot = fs.realpathSync(projectRoot);
  const allowed = ALLOWED_SAVE_ROOTS.some((relativeRoot) => {
    const allowedRoot = path.resolve(realRoot, relativeRoot);
    let realAllowedRoot;
    try {
      realAllowedRoot = fs.realpathSync(allowedRoot);
    } catch {
      return false;
    }
    if (realAllowedRoot !== allowedRoot) {
      return false;
    }
    return realPath === allowedRoot || realPath.startsWith(`${allowedRoot}${path.sep}`);
  });
  if (!allowed) {
    throw new Error(`Invalid LOCAL_SAVE_FILE "${selected}": file must be under tests/fixtures/saves or profiles`);
  }

  let stat;
  try {
    stat = fs.statSync(realPath);
  } catch {
    throw new Error(`Invalid LOCAL_SAVE_FILE "${selected}": file does not exist`);
  }
  if (!stat.isFile()) {
    throw new Error(`Invalid LOCAL_SAVE_FILE "${selected}": path is not a file`);
  }
  if (path.extname(realPath).toLowerCase() !== '.json') {
    throw new Error(`Invalid LOCAL_SAVE_FILE "${selected}": file must have a .json extension`);
  }
  try {
    JSON.parse(fs.readFileSync(realPath, 'utf8'));
  } catch {
    throw new Error(`Invalid LOCAL_SAVE_FILE "${selected}": file must contain valid JSON`);
  }

  return realPath;
}

function getProfileModuleAliases(options) {
  const projectRoot = options.projectRoot;
  const localSave = selectLocalSave({ ...options, projectRoot });
  return {
    '@profile-source': localSave
      ? path.join(projectRoot, 'data/fetchers/getProfile.local.tsx')
      : path.join(projectRoot, 'data/fetchers/getProfile.tsx'),
    ...(localSave ? { '@local-save': localSave } : {}),
  };
}

module.exports = { DEFAULT_LOCAL_SAVE_FILE, getProfileModuleAliases, selectLocalSave };
