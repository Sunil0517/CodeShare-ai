export interface CodeSnippet {
  id: string;
  content: string;
  language: string;
  createdAt: Date;
  expiresAt: Date | null;
  isEditable: boolean;
}

export type SupportedLanguage = {
  id: string;
  name: string;
  extension: string;
};