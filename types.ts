export interface ThemeContextType {
  fontSizeMult: number;
  highContrast: boolean;
  toggleHighContrast: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetSettings: () => void;
}

export enum SectionId {
  HERO = 'hero',
  ABOUT = 'about',
  SERVICES = 'services',
  FEATURES = 'features',
  CONTACT = 'contact',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
