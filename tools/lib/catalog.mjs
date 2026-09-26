const allowedSources = new Set(['Owned', 'Private', 'External']);
const retiredNames = new Set(['arteaga-household-core', 'arteaga-household-finance']);

export function validateCatalogScope(catalog) {
  for (const skill of catalog.skills) {
    if (!allowedSources.has(skill.sourceType)) {
      throw new Error(`Excluded catalog source type ${skill.sourceType}: ${skill.id}`);
    }
    if (retiredNames.has(skill.name) || retiredNames.has(skill.id?.split(':').at(-1))) {
      throw new Error(`Retired household skill: ${skill.id}`);
    }
    if ('notionPageId' in skill || 'notionCatalogPageId' in skill) {
      throw new Error(`Notion identifier remains on ${skill.id}`);
    }
  }
}
