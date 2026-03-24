import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const postsDir = path.join(__dirname, 'content', 'posts');

// Convert JSON to Markdown
const convertJsonToMarkdown = (jsonFile) => {
  const content = fs.readFileSync(jsonFile, 'utf-8');
  const data = JSON.parse(content);
  
  const frontMatter = Object.entries(data)
    .filter(([key]) => key !== 'body')
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
      }
      if (typeof value === 'boolean') {
        return `${key}: ${value}`;
      }
      if (typeof value === 'string' && value.includes('\n')) {
        return `${key}: |\n${value.split('\n').map(line => `  ${line}`).join('\n')}`;
      }
      return `${key}: "${value}"`;
    })
    .join('\n');
  
  const body = data.body || '';
  
  const markdown = `---\n${frontMatter}\n---\n\n${body}`;
  
  const mdFile = jsonFile.replace('.json', '.md');
  fs.writeFileSync(mdFile, markdown);
  
  console.log(`✅ Converti: ${path.basename(jsonFile)} → ${path.basename(mdFile)}`);
  
  // Supprimer le fichier JSON original
  fs.unlinkSync(jsonFile);
  console.log(`🗑️  Supprimé: ${path.basename(jsonFile)}`);
};

// Traiter tous les fichiers JSON
const jsonFiles = fs.readdirSync(postsDir).filter(file => file.endsWith('.json'));

if (jsonFiles.length === 0) {
  console.log('✅ Aucun fichier JSON à convertir');
} else {
  console.log(`🔄 Conversion de ${jsonFiles.length} fichiers JSON...`);
  
  jsonFiles.forEach(file => {
    const filePath = path.join(postsDir, file);
    convertJsonToMarkdown(filePath);
  });
  
  console.log('\n🎉 Tous les fichiers ont été convertis en Markdown !');
}
