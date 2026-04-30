// PlaceReady - Cloud Sync Module
// Integrate with Supabase for user accounts and data persistence
// Sign up at https://supabase.com and replace the config below

const SUPABASE_CONFIG = {
  url: 'YOUR_SUPABASE_URL',
  anonKey: 'YOUR_SUPABASE_ANON_KEY'
};

const supabaseInit = async () => {
  if (typeof supabase === 'undefined') {
    console.warn('Supabase client not loaded');
    return null;
  }
  return supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
};

const saveUserData = async (userId, data) => {
  const supabase = await supabaseInit();
  if (!supabase) return;

  const { error } = await supabase
    .from('user_profiles')
    .upsert({ id: userId, data, updated_at: new Date().toISOString() });

  if (error) console.error('Error saving data:', error);
};

const loadUserData = async (userId) => {
  const supabase = await supabaseInit();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('user_profiles')
    .select('data')
    .eq('id', userId)
    .single();

  if (error) console.error('Error loading data:', error);
  return data?.data || null;
};

const signInAnon = async () => {
  const supabase = await supabaseInit();
  if (!supabase) return null;

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) {
    console.error('Error signing in:', error);
    return null;
  }
  return data.user;
};

// OpenAI API Integration
// Get your API key from https://platform.openai.com/api-keys
const OPENAI_CONFIG = {
  getApiKey: () => localStorage.getItem('openai_api_key')
};

const generateAIAnalysis = async (userProfile, company, skillGaps) => {
  const apiKey = OPENAI_CONFIG.getApiKey();
  if (!apiKey) {
    return generateLocalAnalysis(userProfile, company, skillGaps);
  }

  const prompt = `You are an AI career advisor specializing in campus placements. 
Analyze this student's readiness for ${company} and provide a personalized study roadmap.

Student Profile:
- Name: ${userProfile.name}
- Branch: ${userProfile.branch}
- CGPA: ${userProfile.score}
- Skills with proficiency levels (1-3): ${JSON.stringify(userProfile.levels)}

Required Skills for ${company}: ${company.skills.join(', ')}

Skill Gaps: ${skillGaps.join(', ')}

Provide a brief analysis (2-3 sentences) and a 4-week study roadmap with specific resources.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || generateLocalAnalysis(userProfile, company, skillGaps);
  } catch (error) {
    console.error('OpenAI API error:', error);
    return generateLocalAnalysis(userProfile, company, skillGaps);
  }
};

const generateLocalAnalysis = (userProfile, company, skillGaps) => {
  const baseAnalysis = `Based on your current skill set, you're ${skillGaps.length > 0 ? 'not fully ready' : 'well prepared'} for ${company}. `;
  
  const roadmap = skillGaps.slice(0, 4).map((skill, i) => {
    const course = courseMap[skill];
    return {
      week: `Week ${i + 1}`,
      skill: skill,
      course: course?.course || skill,
      link: course?.link || '#'
    };
  });

  return {
    analysis: baseAnalysis,
    roadmap: roadmap
  };
};

// Export for use in main app
window.placeReadyCloud = {
  supabaseInit,
  saveUserData,
  loadUserData,
  signInAnon,
  generateAIAnalysis
};