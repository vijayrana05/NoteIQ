import { GoogleGenerativeAI } from '@google/generative-ai';
import { Types } from 'mongoose';
import { index } from '../config/pinecone';
// Load environment variables


// Initialize the Google AI client
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GOOGLE_API_KEY environment variable is not set');
}
console.log('API Key loaded:', apiKey.substring(0, 10) + '...' + apiKey.substring(apiKey.length - 4));
export const genAI = new GoogleGenerativeAI(apiKey);

export interface EmbeddingResult {
  chunk: string;
  embedding: number[];
  chunkIndex: number;
}

async function insertEmbeddings(embeddings: EmbeddingResult[], noteId: Types.ObjectId) {
  if (!embeddings.length) {
    console.log("⚠️ No embeddings generated — skipping upsert.");
    return;
  }

  console.log("✅ Inserting embeddings into Pinecone...");
  
  const vectors = embeddings.map((item) => ({
    id: `${noteId}-chunk-${item.chunkIndex}`,
    values: item.embedding,
    metadata: { 
      text: item.chunk,
      noteId: noteId.toString(),
      chunkIndex: item.chunkIndex
    }
  }));

  await index.upsert(vectors); // This will now only run if vectors.length > 0
  console.log("✅ Done inserting into Pinecone.");
}


async function generateEmbeddings(text: string, chunkSize: number = 800): Promise<EmbeddingResult[]> {
  // Split text into chunks
  const chunks = chunkText(text, chunkSize);
  const results: EmbeddingResult[] = [];
  
  console.log(`Processing ${chunks.length} chunks...`);
  
  // Get the embedding model
  const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });
  
  // Process each chunk with delay to respect rate limits
  for (let i = 0; i < chunks.length; i++) {
    try {
      console.log(`Processing chunk ${i + 1}/${chunks.length}`);
      
      const result = await model.embedContent(chunks[i]);
      
      results.push({
        chunk: chunks[i],
        embedding: result.embedding.values,
        chunkIndex: i
      });
      
      // Add delay to respect rate limits (1500 RPM = ~25 RPS, so ~40ms between requests)
      if (i < chunks.length - 1) {
        await delay(50);
      }
      
    } catch (error) {
      console.error(`Error processing chunk ${i + 1}:`, error);
      // You might want to retry or handle errors differently
      throw error;
    }
  }
  
  return results;
}

function chunkText(text: string, chunkSize: number): string[] {
  const chunks: string[] = [];
  
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.slice(i, i + chunkSize));
  }
  
  return chunks;
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Example usage
export async function createEmbeddings( yourText :any, noteId?: Types.ObjectId ) {
  try {
    
    const embeddings = await generateEmbeddings(yourText, 800);
    // yourText = `Your long text content goes here. This will be split into chunks of 800 characters each and processed through Google's text-embedding-004 model to generate embeddings.`
    console.log('Generated embeddings:');
    embeddings.forEach((result, index) => {
      console.log(`Chunk ${index + 1}: ${result.chunk.substring(0, 50)}...`);
      console.log(`Embedding dimensions: ${result.embedding.length}`);
      console.log(`First 5 values: [${result.embedding.slice(0, 5).join(', ')}]`);
      console.log('---');
    });
    if(noteId){
      insertEmbeddings(embeddings,noteId)
    }
    return embeddings;
    // You can now save these embeddings to a file or database
    // Example: save to JSON file
    // const fs = require('fs').promises;
    // await fs.writeFile('embeddings.json', JSON.stringify(embeddings, null, 2));
    // console.log('Embeddings saved to embeddings.json');
    
  } catch (error) {
    console.error('Error:', error);
  }
}

export async function deleteNoteEmbeddings(noteId: string) {
  try {
    await index.deleteMany({
    
      noteId: { $eq: noteId.toString() } 
      
    });
    console.log(`Successfully deleted embeddings for noteId: ${noteId}`);
  } catch (error) {
    console.error('Error deleting embeddings:', error);
    throw error;
  }
}

  


// Run the example
// main();