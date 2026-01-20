

// Color palette inspired by popular Linux themes
const THEME_COLORS = {
  // Dracula theme inspired
  draculaBackground: '#282a36',
  draculaCurrent: '#44475a',
  draculaForeground: '#f8f8f2',
  draculaComment: '#6272a4',
  draculaCyan: '#8be9fd',
  draculaGreen: '#50fa7b',
  draculaOrange: '#ffb86c',
  draculaPink: '#ff79c6',
  draculaPurple: '#bd93f9',
  draculaRed: '#ff5555',
  draculaYellow: '#f1fa8c',
  
  // Nord theme inspired
  nordPolarNight1: '#2E3440',
  nordPolarNight2: '#3B4252',
  nordPolarNight3: '#434C5E',
  nordPolarNight4: '#4C566A',
  nordSnowStorm1: '#D8DEE9',
  nordSnowStorm2: '#E5E9F0',
  nordSnowStorm3: '#ECEFF4',
  nordFrost1: '#8FBCBB',
  nordFrost2: '#88C0D0',
  nordFrost3: '#81A1C1',
  nordFrost4: '#5E81AC',
  nordAuroraRed: '#BF616A',
  nordAuroraOrange: '#D08770',
  nordAuroraYellow: '#EBCB8B',
  nordAuroraGreen: '#A3BE8C',
  nordAuroraPurple: '#B48EAD',
  
  // One Dark (Atom/VSCode) inspired
  oneDarkBackground: '#282c34',
  oneDarkRed: '#e06c75',
  oneDarkGreen: '#98c379',
  oneDarkYellow: '#e5c07b',
  oneDarkBlue: '#61afef',
  oneDarkPurple: '#c678dd',
  oneDarkCyan: '#56b6c2',
  oneDarkWhite: '#abb2bf',
  
  // Material Design
  materialRed: '#f44336',
  materialPink: '#e91e63',
  materialPurple: '#9c27b0',
  materialDeepPurple: '#673ab7',
  materialIndigo: '#3f51b5',
  materialBlue: '#2196f3',
  materialLightBlue: '#03a9f4',
  materialCyan: '#00bcd4',
  materialTeal: '#009688',
  materialGreen: '#4caf50',
  materialLightGreen: '#8bc34a',
  materialLime: '#cddc39',
  materialYellow: '#ffeb3b',
  materialAmber: '#ffc107',
  materialOrange: '#ff9800',
  materialDeepOrange: '#ff5722',
  materialBrown: '#795548',
  materialGray: '#9e9e9e',
  materialBlueGray: '#607d8b',
};

export const fileTypeColors: Record<string, any> = {
  // ===== PROGRAMMING LANGUAGES =====
  // JavaScript/TypeScript family
  "js": { 
    color: THEME_COLORS.nordAuroraYellow, 
    type: "code", 
    glyphColor: THEME_COLORS.nordPolarNight1,
    labelColor: THEME_COLORS.nordAuroraYellow,
    gradientColor: THEME_COLORS.draculaYellow,
    gradientOpacity: 0.3
  },
  "jsx": { 
    color: THEME_COLORS.oneDarkCyan, 
    type: "code", 
    glyphColor: THEME_COLORS.oneDarkBackground,
    labelColor: THEME_COLORS.oneDarkCyan,
    gradientColor: THEME_COLORS.nordFrost2,
    gradientOpacity: 0.3
  },
  "ts": { 
    color: THEME_COLORS.materialBlue, 
    type: "code", 
    glyphColor: THEME_COLORS.oneDarkBackground,
    labelColor: THEME_COLORS.materialBlue,
    gradientColor: THEME_COLORS.nordFrost4,
    gradientOpacity: 0.3
  },
  
  // Web technologies
  "html": { 
    color: THEME_COLORS.materialDeepOrange, 
    type: "code", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialDeepOrange,
    gradientColor: THEME_COLORS.draculaOrange,
    gradientOpacity: 0.2
  },
  "css": { 
    color: THEME_COLORS.materialBlue, 
    type: "code", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialBlue,
    gradientColor: THEME_COLORS.nordFrost3,
    gradientOpacity: 0.2
  },
  "scss": { 
    color: THEME_COLORS.materialPink, 
    type: "code", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialPink,
    gradientColor: THEME_COLORS.draculaPink,
    gradientOpacity: 0.3
  },
  "json": { 
    color: THEME_COLORS.nordAuroraYellow, 
    type: "code", 
    glyphColor: THEME_COLORS.nordPolarNight1,
    labelColor: THEME_COLORS.nordAuroraYellow,
    cornerRadius: 2,
    gradientOpacity: 0.2
  },
  
  // Backend languages
  "py": { 
    color: THEME_COLORS.nordFrost4, 
    type: "code", 
    glyphColor: THEME_COLORS.nordSnowStorm3,
    labelColor: THEME_COLORS.nordFrost4,
    gradientColor: THEME_COLORS.nordFrost2,
    gradientOpacity: 0.3
  },
  "java": { 
    color: THEME_COLORS.materialRed, 
    type: "code", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialRed,
    gradientColor: THEME_COLORS.draculaRed,
    gradientOpacity: 0.2
  },
  "php": { 
    color: THEME_COLORS.draculaPurple, 
    type: "code", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.draculaPurple,
    gradientColor: THEME_COLORS.materialPurple,
    gradientOpacity: 0.3
  },
  "rb": { 
    color: THEME_COLORS.materialPink, 
    type: "code", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialPink,
    gradientColor: THEME_COLORS.draculaPink,
    gradientOpacity: 0.3
  },
  
  // C family
  "c": { 
    color: THEME_COLORS.nordPolarNight4, 
    type: "code", 
    glyphColor: THEME_COLORS.nordSnowStorm2,
    labelColor: THEME_COLORS.nordPolarNight4,
    gradientColor: THEME_COLORS.nordPolarNight3,
    gradientOpacity: 0.2
  },
  "cpp": { 
    color: THEME_COLORS.nordFrost3, 
    type: "code", 
    glyphColor: THEME_COLORS.nordSnowStorm3,
    labelColor: THEME_COLORS.nordFrost3,
    gradientColor: THEME_COLORS.nordFrost1,
    gradientOpacity: 0.3
  },
  "cs": { 
    color: THEME_COLORS.materialPurple, 
    type: "code", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialPurple,
    gradientColor: THEME_COLORS.draculaPurple,
    gradientOpacity: 0.3
  },
  
  // ===== DOCUMENTS =====
  "pdf": { 
    color: THEME_COLORS.draculaRed, 
    type: "acrobat", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.draculaRed,
    gradientColor: THEME_COLORS.materialRed,
    gradientOpacity: 0.2
  },
  "doc": { 
    color: THEME_COLORS.materialBlue, 
    type: "document", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialBlue,
    gradientColor: THEME_COLORS.nordFrost4,
    gradientOpacity: 0.2
  },
  "docx": { 
    color: THEME_COLORS.materialBlue, 
    type: "document", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialBlue,
    gradientColor: THEME_COLORS.nordFrost4,
    gradientOpacity: 0.2
  },
  "txt": { 
    color: THEME_COLORS.nordSnowStorm2, 
    type: "text", 
    glyphColor: THEME_COLORS.nordPolarNight3,
    labelColor: THEME_COLORS.nordSnowStorm2,
    gradientColor: THEME_COLORS.nordSnowStorm3,
    gradientOpacity: 0.1
  },
  "md": { 
    color: THEME_COLORS.nordPolarNight4, 
    type: "text", 
    glyphColor: THEME_COLORS.nordSnowStorm2,
    labelColor: THEME_COLORS.nordPolarNight4,
    gradientColor: THEME_COLORS.nordPolarNight3,
    gradientOpacity: 0.2
  },
  "rtf": { 
    color: THEME_COLORS.nordFrost3, 
    type: "document", 
    glyphColor: THEME_COLORS.nordSnowStorm3,
    labelColor: THEME_COLORS.nordFrost3,
    gradientColor: THEME_COLORS.nordFrost1,
    gradientOpacity: 0.2
  },
  
  // ===== SPREADSHEETS =====
  "xls": { 
    color: THEME_COLORS.materialGreen, 
    type: "spreadsheet", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialGreen,
    gradientColor: THEME_COLORS.nordAuroraGreen,
    gradientOpacity: 0.2
  },
  "xlsx": { 
    color: THEME_COLORS.materialGreen, 
    type: "spreadsheet", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialGreen,
    gradientColor: THEME_COLORS.nordAuroraGreen,
    gradientOpacity: 0.2
  },
  "csv": { 
    color: THEME_COLORS.nordAuroraGreen, 
    type: "spreadsheet", 
    glyphColor: THEME_COLORS.nordPolarNight1,
    labelColor: THEME_COLORS.nordAuroraGreen,
    gradientColor: THEME_COLORS.materialLightGreen,
    gradientOpacity: 0.3
  },
  
  // ===== PRESENTATIONS =====
  "ppt": { 
    color: THEME_COLORS.materialOrange, 
    type: "presentation", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialOrange,
    gradientColor: THEME_COLORS.draculaOrange,
    gradientOpacity: 0.2
  },
  "pptx": { 
    color: THEME_COLORS.materialOrange, 
    type: "presentation", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialOrange,
    gradientColor: THEME_COLORS.draculaOrange,
    gradientOpacity: 0.2
  },
  
  // ===== IMAGES =====
  "jpg": { 
    color: THEME_COLORS.materialLightBlue, 
    type: "image", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialLightBlue,
    gradientColor: THEME_COLORS.nordFrost2,
    gradientOpacity: 0.3
  },
  "jpeg": { 
    color: THEME_COLORS.materialLightBlue, 
    type: "image", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialLightBlue,
    gradientColor: THEME_COLORS.nordFrost2,
    gradientOpacity: 0.3
  },
  "png": { 
    color: THEME_COLORS.nordFrost2, 
    type: "image", 
    glyphColor: THEME_COLORS.nordPolarNight1,
    labelColor: THEME_COLORS.nordFrost2,
    gradientColor: THEME_COLORS.nordFrost1,
    gradientOpacity: 0.3
  },
  "gif": { 
    color: THEME_COLORS.materialPink, 
    type: "image", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialPink,
    gradientColor: THEME_COLORS.draculaPink,
    gradientOpacity: 0.3
  },
  "svg": { 
    color: THEME_COLORS.draculaOrange, 
    type: "vector", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.draculaOrange,
    gradientColor: THEME_COLORS.materialAmber,
    gradientOpacity: 0.3
  },
  "psd": { 
    color: THEME_COLORS.materialBlue, 
    type: "image", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialBlue,
    gradientColor: THEME_COLORS.nordFrost3,
    gradientOpacity: 0.3
  },
  "ai": { 
    color: THEME_COLORS.materialOrange, 
    type: "vector", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialOrange,
    gradientColor: THEME_COLORS.draculaOrange,
    gradientOpacity: 0.3
  },
  
  // ===== AUDIO =====
  "mp3": { 
    color: THEME_COLORS.nordAuroraPurple, 
    type: "audio", 
    glyphColor: THEME_COLORS.nordSnowStorm3,
    labelColor: THEME_COLORS.nordAuroraPurple,
    gradientColor: THEME_COLORS.materialPurple,
    gradientOpacity: 0.3
  },
  "wav": { 
    color: THEME_COLORS.nordFrost1, 
    type: "audio", 
    glyphColor: THEME_COLORS.nordPolarNight1,
    labelColor: THEME_COLORS.nordFrost1,
    gradientColor: THEME_COLORS.nordFrost3,
    gradientOpacity: 0.3
  },
  "flac": { 
    color: THEME_COLORS.materialDeepPurple, 
    type: "audio", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialDeepPurple,
    gradientColor: THEME_COLORS.draculaPurple,
    gradientOpacity: 0.3
  },
  
  // ===== VIDEO =====
  "mp4": { 
    color: THEME_COLORS.materialPurple, 
    type: "video", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialPurple,
    gradientColor: THEME_COLORS.draculaPurple,
    gradientOpacity: 0.3
  },
  "avi": { 
    color: THEME_COLORS.nordFrost4, 
    type: "video", 
    glyphColor: THEME_COLORS.nordSnowStorm3,
    labelColor: THEME_COLORS.nordFrost4,
    gradientColor: THEME_COLORS.nordFrost2,
    gradientOpacity: 0.3
  },
  "mov": { 
    color: THEME_COLORS.materialBlueGray, 
    type: "video", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialBlueGray,
    gradientColor: THEME_COLORS.nordPolarNight4,
    gradientOpacity: 0.3
  },
  "mkv": { 
    color: THEME_COLORS.materialIndigo, 
    type: "video", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialIndigo,
    gradientColor: THEME_COLORS.nordFrost4,
    gradientOpacity: 0.3
  },
  
  // ===== ARCHIVES =====
  "zip": { 
    color: THEME_COLORS.nordAuroraOrange, 
    type: "compressed", 
    glyphColor: THEME_COLORS.nordPolarNight1,
    labelColor: THEME_COLORS.nordAuroraOrange,
    gradientColor: THEME_COLORS.draculaOrange,
    gradientOpacity: 0.3
  },
  "rar": { 
    color: THEME_COLORS.materialRed, 
    type: "compressed", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialRed,
    gradientColor: THEME_COLORS.draculaRed,
    gradientOpacity: 0.2
  },
  "7zip": { 
    color: THEME_COLORS.materialGreen, 
    type: "compressed", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialGreen,
    gradientColor: THEME_COLORS.nordAuroraGreen,
    gradientOpacity: 0.2
  },
  "tar": { 
    color: THEME_COLORS.nordPolarNight4, 
    type: "compressed", 
    glyphColor: THEME_COLORS.nordSnowStorm2,
    labelColor: THEME_COLORS.nordPolarNight4,
    gradientColor: THEME_COLORS.nordPolarNight3,
    gradientOpacity: 0.2
  },
  "gz": { 
    color: THEME_COLORS.nordPolarNight3, 
    type: "compressed", 
    glyphColor: THEME_COLORS.nordSnowStorm1,
    labelColor: THEME_COLORS.nordPolarNight3,
    gradientColor: THEME_COLORS.nordPolarNight4,
    gradientOpacity: 0.2
  },
  
  // ===== EXECUTABLES & SYSTEM =====
  "exe": { 
    color: THEME_COLORS.materialGreen, 
    type: "executable", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.materialGreen,
    gradientColor: THEME_COLORS.nordAuroraGreen,
    gradientOpacity: 0.3
  },
  "dll": { 
    color: THEME_COLORS.nordPolarNight3, 
    type: "executable", 
    glyphColor: THEME_COLORS.nordSnowStorm2,
    labelColor: THEME_COLORS.nordPolarNight3,
    gradientColor: THEME_COLORS.nordPolarNight4,
    gradientOpacity: 0.2
  },
  "app": { 
    color: THEME_COLORS.nordFrost2, 
    type: "application", 
    glyphColor: THEME_COLORS.nordPolarNight1,
    labelColor: THEME_COLORS.nordFrost2,
    gradientColor: THEME_COLORS.nordFrost1,
    gradientOpacity: 0.3
  },
  "dmg": { 
    color: THEME_COLORS.nordSnowStorm2, 
    type: "disk", 
    glyphColor: THEME_COLORS.nordPolarNight3,
    labelColor: THEME_COLORS.nordSnowStorm2,
    gradientColor: THEME_COLORS.nordSnowStorm3,
    gradientOpacity: 0.1
  },
  
  // ===== FONTS =====
  "ttf": { 
    color: THEME_COLORS.nordFrost3, 
    type: "font", 
    glyphColor: THEME_COLORS.nordSnowStorm3,
    labelColor: THEME_COLORS.nordFrost3,
    gradientColor: THEME_COLORS.nordFrost1,
    gradientOpacity: 0.3
  },
  "otf": { 
    color: THEME_COLORS.nordFrost4, 
    type: "font", 
    glyphColor: THEME_COLORS.nordSnowStorm3,
    labelColor: THEME_COLORS.nordFrost4,
    gradientColor: THEME_COLORS.nordFrost2,
    gradientOpacity: 0.3
  },
  "woff": { 
    color: THEME_COLORS.nordAuroraPurple, 
    type: "font", 
    glyphColor: THEME_COLORS.nordSnowStorm3,
    labelColor: THEME_COLORS.nordAuroraPurple,
    gradientColor: THEME_COLORS.materialPurple,
    gradientOpacity: 0.3
  },
  
  // ===== DATABASE & CONFIG =====
  "sql": { 
    color: THEME_COLORS.draculaCyan, 
    type: "database", 
    glyphColor: THEME_COLORS.draculaForeground,
    labelColor: THEME_COLORS.draculaCyan,
    gradientColor: THEME_COLORS.nordFrost1,
    gradientOpacity: 0.3
  },
  "yml": { 
    color: THEME_COLORS.nordAuroraRed, 
    type: "config", 
    glyphColor: THEME_COLORS.nordSnowStorm3,
    labelColor: THEME_COLORS.nordAuroraRed,
    gradientColor: THEME_COLORS.draculaRed,
    gradientOpacity: 0.2
  },
  "yaml": { 
    color: THEME_COLORS.nordAuroraRed, 
    type: "config", 
    glyphColor: THEME_COLORS.nordSnowStorm3,
    labelColor: THEME_COLORS.nordAuroraRed,
    gradientColor: THEME_COLORS.draculaRed,
    gradientOpacity: 0.2
  },
  "ini": { 
    color: THEME_COLORS.nordPolarNight4, 
    type: "config", 
    glyphColor: THEME_COLORS.nordSnowStorm2,
    labelColor: THEME_COLORS.nordPolarNight4,
    gradientColor: THEME_COLORS.nordPolarNight3,
    gradientOpacity: 0.2
  },
  
  // ===== DEFAULT =====
  "default": { 
    color: THEME_COLORS.nordPolarNight4, 
    type: "text", 
    glyphColor: THEME_COLORS.nordSnowStorm2,
    labelColor: THEME_COLORS.nordPolarNight4,
    gradientColor: THEME_COLORS.nordPolarNight3,
    gradientOpacity: 0.1,
    radius: 4
  }
};

// Helper function with fallback
export const getFileTypeStyle = (extension: string): any => {
  const ext = extension.toLowerCase();
  return fileTypeColors[ext] || fileTypeColors.default;
};

// Optional: Create color scheme variations
export const COLOR_SCHEMES = {
  DRACULA: 'dracula',
  NORD: 'nord', 
  ONE_DARK: 'one-dark',
  MATERIAL: 'material'
} as const;

export type ColorScheme = typeof COLOR_SCHEMES[keyof typeof COLOR_SCHEMES];