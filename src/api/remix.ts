import Anthropic from '@anthropic-ai/sdk';

function getApiKey() {
  return typeof window !== 'undefined' 
    ? (window as any).ENV?.VITE_ANTHROPIC_API_KEY 
    : process.env.VITE_ANTHROPIC_API_KEY;
}

const anthropic = new Anthropic({
  apiKey: getApiKey() || '',
  dangerouslyAllowBrowser: true
});

export async function remixContent(content: string, style: string = 'casual'): Promise<string[]> {
  const API_KEY = getApiKey();
  if (!API_KEY) {
    throw new Error('Neural synthesis failed: API key not configured');
  }

  if (!content) {
    throw new Error('Content stream empty');
  }

  let prompt = '';
  switch (style) {
    case 'casual':
      prompt = `Transform this content into 3 separate casual, everyday tweets. Make each tweet brief and easy to understand. Separate each tweet with [TWEET]. Content: ${content}`;
      break;
    case 'cybernetic':
      prompt = `Transform this content into 3 separate tweets using cyberpunk terminology and tech metaphors. Make each tweet feel like it's from a high-tech future. Separate each tweet with [TWEET]. Content: ${content}`;
      break;
    case 'very-cybernetic':
      prompt = `Transform this content into 3 separate tweets using extreme cyberpunk terminology and tech metaphors. Include heavy tech jargon and neural interface references. Separate each tweet with [TWEET]. Content: ${content}`;
      break;
    case 'extreme-cybernetic':
      prompt = `Transform this content into 3 separate tweets using advanced technological concepts and quantum terminology. Make each tweet feel like a transmission from a post-human AI. Even more extreme. Separate each tweet with [TWEET]. Content: ${content}`;
      break;
    default:
      prompt = `Transform this content into 3 separate tweets while maintaining its core meaning. Separate each tweet with [TWEET]. Content: ${content}`;
  }

  prompt = `${prompt}\n\nIMPORTANT: Format each tweet to be impactful but brief (under 280 characters). Return exactly 3 tweets, separated by [TWEET].`;

  try {
    const message = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }],
      temperature: style.includes('cybernetic') ? 0.9 : 0.7,
    });

    const responseText = message.content[0].type === 'text' 
      ? message.content[0].text
      : '';

    if (!responseText) {
      throw new Error('Neural synthesis failed - no output detected');
    }

    // Split the response into separate tweets and clean them up
    const tweets = responseText
      .split('[TWEET]')
      .map(tweet => tweet.trim())
      .filter(tweet => tweet.length > 0);

    // Ensure we have exactly 3 tweets
    if (tweets.length < 3) {
      throw new Error('Neural synthesis failed - insufficient tweet generation');
    }

    return tweets.slice(0, 3); // Return only the first 3 tweets
  } catch (error) {
    console.error('Neural interface disrupted:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Neural synthesis failure: Unknown disruption');
  }
} 