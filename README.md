# A content remixing tool using React.

## 

1. Paste in text we want to remix.
2. Click a button to apply the remixing we want for it.
3. Send the reuqest to an AI API endpoint.
4. See the remix in an output box.
5. Add other styling and features that we want as we go.

## Tech stack

- React
- Tailwind
- Vercel
- Claude API

### Challenges

1. Add in another API endpoint.
2. Add a way to tweet or to schedule a tweet from the output.
3. Add a way to upload audio files and to have them transcribed.
4. Add a way to save the remixed content to a database.

### Implementation Order

1. Database Integration
   - Add MongoDB or PostgreSQL
   - Create schema for saved remixes
   - Add save/load functionality

2. Additional API Integration
   - Add OpenAI as alternative
   - Add API selector in UI
   - Compare results

3. Twitter Integration
   - Add Twitter OAuth
   - Add tweet composer
   - Add schedule functionality

4. Audio Transcription
   - Add file upload
   - Integrate Whisper API
   - Add transcription preview
