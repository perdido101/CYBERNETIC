import Anthropic from '@anthropic-ai/sdk';

// Add fallback and error handling for API key
const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error('Neural interface error: API key not found');
}

const anthropic = new Anthropic({
  apiKey: API_KEY || '', // Provide empty string as fallback
  dangerouslyAllowBrowser: true
});

export async function remixContent(content: string, style: string = 'casual'): Promise<string> {
  if (!API_KEY) {
    throw new Error('Neural synthesis failed: API key not configured');
  }

  if (!content) {
    throw new Error('Content stream empty');
  }

  let prompt = '';
  switch (style) {
    case 'casual':
      prompt = `Transform this content into a casual, everyday style. Keep it brief (2-3 sentences max) while maintaining the core meaning: ${content}`;
      break;
    case 'cybernetic':
      prompt = `Rewrite this content in 2-3 sentences using cyberpunk terminology and tech metaphors. Make it feel like it's from a high-tech future while keeping it concise: ${content}`;
      break;
    case 'very-cybernetic':
      prompt = `Transform this into a brief cyberpunk version (2-3 sentences) with heavy tech jargon and neural interface references. Include digital consciousness themes but keep it short: ${content}`;
      break;
    case 'extreme-cybernetic':
      prompt = `Provide a 2-3 sentence cyberpunk reimagining with advanced technological concepts and quantum terminology. Make it feel like a transmission from a post-human AI while being concise: ${content}`;
      break;
    default:
      prompt = `Transform this content into 2-3 concise sentences while maintaining its core meaning: ${content}`;
  }

  prompt = `${prompt}\n\nIMPORTANT: Respond with exactly 2-3 sentences, no more. Be impactful but brief.`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: style.includes('cybernetic') ? 0.9 : 0.7,
    });

    const responseText = message.content[0].type === 'text' 
      ? message.content[0].text
      : '';

    if (!responseText) {
      throw new Error('Neural synthesis failed - no output detected');
    }

    return responseText.trim();
  } catch (error) {
    console.error('Neural interface disrupted:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Neural synthesis failure: Unknown disruption');
  }
} 